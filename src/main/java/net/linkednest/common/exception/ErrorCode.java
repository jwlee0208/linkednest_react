package net.linkednest.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    //400 BAD_REQUEST 잘못된 요청
    INVALID_PARAMETER(400, "파라미터 값을 확인해주세요."),
    //404 NOT_FOUND 잘못된 리소스 접근
    DISPLAY_NOT_FOUND(404, "NOT FOUND"),
    FAIR_NOT_FOUND(404, "존재하지 않는 박람회 ID 박람회입니다."),
    //500 INTERNAL SERVER ERROR
    INTERNAL_SERVER_ERROR(500, "SERVER ERROR");

    private final int status;
    private final String message;

}
