package net.linkednest.www.utils;

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

}
