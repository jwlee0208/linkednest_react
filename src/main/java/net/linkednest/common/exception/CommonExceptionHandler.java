package net.linkednest.common.exception;

import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.CommonResDto;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

//@RestControllerAdvice
public class CommonExceptionHandler {
    @ExceptionHandler({CustomException.class})
    protected ResponseEntity handleCustomException(CustomException ce) {
        CommonResDto resObj = new CommonResDto();
        resObj.setReturnCode(ce.getErrorCode().getStatus());
        resObj.setReturnMsg(ce.getErrorCode().getMessage());
        return new ResponseEntity(resObj, HttpStatus.valueOf(ce.getErrorCode().getStatus()));
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    protected ResponseEntity handleException(DataIntegrityViolationException e) {
        CommonResDto resObj = new CommonResDto();
        resObj.setReturnCode(20004);
        resObj.setReturnMsg(ResponseCodeMsg.of(20004).getResMsg());
        return new ResponseEntity(resObj, HttpStatus.valueOf(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()));
    }


/*
    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleServerException(Exception e) {
        CommonResDto resObj = new CommonResDto();
        resObj.setReturnCode(50000);
        resObj.setReturnMsg(e.getLocalizedMessage());
        return new ResponseEntity(resObj, HttpStatus.valueOf(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()));
    }*/

}
