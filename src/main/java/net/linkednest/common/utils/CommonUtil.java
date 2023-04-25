package net.linkednest.common.utils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

/**
 * packageName    : kr.co.cobosys.crm.utils
 * fileName       : CommonUtils
 * author         : thomas
 * date           : 2022-09-27
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022-09-27           thomas             최초 생성
 */
@Slf4j
public class CommonUtil {
	public static String cleanXSS(String strVal) {
		strVal = strVal.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		//		strVal = strVal.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
		strVal = strVal.replaceAll("'", "&#39;");
		strVal = strVal.replaceAll("eval\\((.*)\\)", "");
		strVal = strVal.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
		strVal = strVal.replaceAll("script", "");
		return strVal;
	}

	public static String removeTag(String html) {
		return html.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}

	public static String getClientIp(HttpServletRequest request) {
		String ipAddr = request.getHeader("X-Forwarded-For");
		log.info("[{].{}] X-FORWARDED-FOR : {}", "CommonUtil", "getClientIp", ipAddr);
		if (StringUtils.isEmpty(ipAddr)) {
			ipAddr = request.getHeader("Proxy-Client-IP");
			log.info("[{].{}] Proxy-Client-IP : {}", "CommonUtil", "getClientIp", ipAddr);
		}
		if (StringUtils.isEmpty(ipAddr)) {
			ipAddr = request.getHeader("WL-Proxy-Client-IP");
			log.info("[{].{}] WL-Proxy-Client-IP : {}", "CommonUtil", "getClientIp", ipAddr);
		}
		if (StringUtils.isEmpty(ipAddr)) {
			ipAddr = request.getHeader("HTTP_CLIENT_IP");
			log.info("[{].{}] HTTP_CLIENT_IP : {}", "CommonUtil", "getClientIp", ipAddr);
		}
		if (StringUtils.isEmpty(ipAddr)) {
			ipAddr = request.getHeader("HTTP_X_FORWARDED_FOR");
			log.info("[{].{}] HTTP_X_FORWARDED_FOR : {}", "CommonUtil", "getClientIp", ipAddr);
		}
		if (StringUtils.isEmpty(ipAddr)) {
			ipAddr = request.getRemoteAddr();
			log.info("[{].{}] remoteAddr : {}", "CommonUtil", "getClientIp", ipAddr);
		}
		log.info("[{].{}] Result IP Address : {}", "CommonUtil", "getClientIp", ipAddr);
		return ipAddr;
	}
}
