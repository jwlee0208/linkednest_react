package net.linkednest.common;

public class CommonConstants {
    public final static String ENV_MODE_LOCAL           = "local";
    public final static String ENV_MODE_DEV             = "dev";
    public final static String ENV_MODE_PROD            = "prod";
    public final static String REFRESH_TOKEN            = "REFRESH_TOKEN";
    public final static String ACTION_CREATE            = "CREATE";
    public final static String ACTION_UPDATE            = "UPDATE";
    public final static String WEB_LOGIN_ACTION         = "WEB_LOGIN";
    public final static String WEB_TOKEN_LOGIN_ACTION   = "WEB_TOKEN_LOGIN";
    public final static String LOGOUT_ACTION            = "LOGOUT";
    public final static String REG_EX_NORMAL_PHONE_NO   = "^\\d{2,3}"+"-"+"\\d{3,4}"+"-"+"\\d{4}$"; // 일반 전화번호 체크
    //    public final String REG_EX_CELL_PHONE_NO    = "^01(?:[0-9])"+"-"+"(?:\\d{3}|\\d{4})"+"-"+"\\d{4}$";
    public final static String REG_EX_CELL_PHONE_NO     = "^01(?:[0-9])"+"(?:\\d{3}|\\d{4})"+"\\d{4}$";  // 핸드폰 전화번호 체크
    public final static String REG_EX_EMAIL             = "^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\\.[0-9a-zA-Z_-]+){1,2}$"; // 이메일 정규식 체크
    public final static String REG_EX_KOREAN            = "^[ㄱ-ㅎ가-힣]*$";  // 한글 정규식 체크
    public final static String REG_EX_ENGLISH           = "^[a-zA-Z]*$"; // 영어 정규식 체크
    public final static String REG_EX_NUMERIC           = "^[0-9]*$";  // 숫자 정규식 체크
    public final static String REG_EX_ENG_NUM           = "^[a-zA-Z0-9]*$"; // 영어 & 숫자 정규식 체크
    public final static String REG_EX_YYYY_MM_DD        = "^[0-9][0-9][0-9][0-9]\\-[0-9][0-9]\\-[0-9][0-9]$"; // 날짜 정규식 체크(YYYY-MM-DD)
    //  "^((19|20)\\d\\d)?([- /.])?(0[1-9]|1[012])([- /.])?(0[1-9]|[12][0-9]|3[01])$";
    public final static String REG_EX_DECIMAL_POINT     = "^[0-9]*\\.?[0-9]*"; // 숫자 or 숫자와 소수점 정규식 체크(몸무게 혹은 키)
    public final static String REG_EX_URL               = "^(https?):\\/\\/([^:\\/\\s]+)(:([^\\/]*))?((\\/[^\\s/\\/]+)*)?\\/([^#\\s\\?]*)(\\?([^#\\s]*))?(#(\\w*))?$";  // URL 정규식 체크
    public final static String IMAGE_FILES_EXT		    = "jpg, jpeg, bmp, gif, png";


}
