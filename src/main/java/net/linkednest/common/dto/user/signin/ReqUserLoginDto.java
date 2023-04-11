package net.linkednest.common.dto.user.signin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@ToString
public class ReqUserLoginDto {
    @Schema(description = "사용자 아이디", required = true, example = "test01@test.com")
    private String userId;
    @Schema(description = "패스워드", required = true, minLength = 8, maxLength = 16, example = "asdf1234")
    private String password;
}
