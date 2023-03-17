package net.linkednest.www.dto.user.login;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import net.linkednest.www.dto.user.CommonResDto;

@Data
public class ResUserLoginDto extends CommonResDto {
    @Schema(description = "사용자 아이디", defaultValue = "test01@test.com", name = "username", required = true)
    private String username;
    @Schema(description = "인증 토큰", defaultValue = "asdfqwetasd2asdf", name = "accessToken", required = false)
    private String accessToken;
    @Schema(description = "로그인 여부", defaultValue = "true", name = "isLogin", required = true)
    private Boolean isLogin;
}
