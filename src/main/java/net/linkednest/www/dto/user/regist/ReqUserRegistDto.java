package net.linkednest.www.dto.user.regist;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ReqUserRegistDto {
    @Schema(description = "사용자 아이디", required = true, example = "test01@test.com")
    private String username;
    @Schema(description = "패스워드", required = true, minLength = 8, maxLength = 16, example = "asdf1234")
    private String password;
    @Schema(description = "사용자 닉네임", required = false, example = "nick01")
    private String nickname;
}
