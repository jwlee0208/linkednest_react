package net.linkednest.common;

import lombok.Getter;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
public enum ResponseCodeMsg {
    RES_CODE_10000(10000, "SUCCESS"),
    RES_CODE_20001(20001, "PASSWORD NOT MATCHED"),
    RES_CODE_20002(20002, "USER NOT EXIST"),
    RES_CODE_20003(20003, "RECAPTCHA IS INVALID"),
    RES_CODE_20004(20004, "ALREADY_EXIST_USER"),
    RES_CODE_20005(20005, "USER_NOT_MATCHED"),
    RES_CODE_40000(40000, "DATA NOT EXIST"),
    RES_CODE_50000(50000, "SERVER ERROR");

    private Integer   resCode;
    private String    resMsg;

    ResponseCodeMsg(Integer resCode, String resMsg) {
        this.resCode = resCode;
        this.resMsg = resMsg;
    }

    private static final Map<Integer, String> codeMap = Collections.unmodifiableMap(Stream.of(values()).collect(Collectors.toMap(ResponseCodeMsg::getResCode, ResponseCodeMsg::name)));

    public static ResponseCodeMsg of(final Integer resCode) {
        return ResponseCodeMsg.valueOf(codeMap.get(resCode));
    }
}
