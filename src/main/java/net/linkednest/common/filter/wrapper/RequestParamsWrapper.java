package net.linkednest.common.filter.wrapper;


import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import net.linkednest.common.utils.CommonUtil;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.entity.ContentType;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

public class RequestParamsWrapper extends HttpServletRequestWrapper {
	private final Charset encoding;
	private byte[] rawData;
	private final Map<String, String[]> params = new HashMap<>();

	public RequestParamsWrapper(HttpServletRequest request) {
		super(request);
		this.params.putAll(request.getParameterMap());

		String charEncoding = request.getCharacterEncoding();
		this.encoding = StringUtils.isBlank(charEncoding) ? StandardCharsets.UTF_8 : Charset.forName(charEncoding);

		try {
			InputStream is = request.getInputStream();
			this.rawData = IOUtils.toByteArray(is);

			// body parsing

			String collect = this.getReader().
			lines().collect(Collectors.joining(System.lineSeparator()));
			if (StringUtils.isEmpty(collect)) {
				return;
			}

			if (request.getContentType() != null && request.getContentType().contains(ContentType.MULTIPART_FORM_DATA.getMimeType())) {
				return;
			}

			JSONParser jsonParser = new JSONParser();
			Object parse = jsonParser.parse(collect);

			if (parse instanceof JSONArray) {
				JSONArray jsonArray = (JSONArray) jsonParser.parse(collect);
				setParameter("requestBody", jsonArray.toJSONString());
			} else {

				JSONObject jsonObject = (JSONObject) jsonParser.parse(collect);
				jsonObject.keySet().stream().forEach(key -> {
					setParameter((String)key, String.valueOf(jsonObject.get(key)).replace("\"", "\\\""));
				});
/*				Iterator iterator = jsonObject.keySet().iterator();
				while (iterator.hasNext()) {
					String key = (String) iterator.next();
					setParameter(key, String.valueOf(jsonObject.get(key)).replace("\"", "\\\""));
				}*/
				// header setting for CORS
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public String getParameter(String name) {
		String[] paramArray = getParameterValues(name);
		if (paramArray != null && paramArray.length > 0) {
			return paramArray[0];
		} else {
			return null;
		}
	}

	@Override
	public Map<String, String[]> getParameterMap() {
		return Collections.unmodifiableMap(params);
	}

	@Override
	public Enumeration<String> getParameterNames() {
		return Collections.enumeration(params.keySet());
	}

	@Override
	public String[] getParameterValues(String name) {
		String[] result = null;
		String[] dummyParamValue = params.get(name);

		if (dummyParamValue != null) {
			result = new String[dummyParamValue.length];
			System.arraycopy(dummyParamValue, 0, result, 0, dummyParamValue.length);
		}
		return result;
	}

	public void setParameter(String name, String value) {
		String[] param = {CommonUtil.cleanXSS(value)};
		setParameter(name, param);
	}

	public void setParameter(String name, String[] values) {
		Arrays.stream(values).forEach(v -> CommonUtil.cleanXSS(v));
		params.put(name, values);
	}

	public ServletInputStream getInputStream() {
		final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(this.rawData);

		return new ServletInputStream() {
			@Override
			public boolean isFinished() {
				return false;
			}

			@Override
			public boolean isReady() {
				return false;
			}

			@Override
			public void setReadListener(ReadListener listener) {

			}

			@Override
			public int read() throws IOException {
				return byteArrayInputStream.read();
			}
		};
	}

	@Override
	public BufferedReader getReader() {
		return new BufferedReader(new InputStreamReader(this.getInputStream(), this.encoding));
	}
}