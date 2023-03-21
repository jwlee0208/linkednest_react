package net.linkednest.www.dto.user.signin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import net.linkednest.www.dto.CommonResDto;

@Data
public class ResUserLoginDto extends CommonResDto {
    @Schema(description = "사용자 아이디", defaultValue = "test01@test.com", name = "username", required = true)
    private String username;
    @Schema(description = "인증 토큰", defaultValue = "asdfqwetasd2asdf", name = "accessToken", required = false)
    private String accessToken;
/*
    @Schema(description = "Refresh Token", required = false)
    private String refreshToken;
*/
    @Schema(description = "로그인 여부", defaultValue = "true", name = "isLogin", required = true)
    private Boolean isLogin;

    @Schema(description = "Email", defaultValue = "true", name = "email", required = false)
    private String email;

    @Schema(description = "자기 소개", defaultValue = "true", name = "introduce", required = false)
    private String introduce;

    @Schema(description = "닉네임", defaultValue = "true", name = "nickname", required = false)
    private String nickname;
}
