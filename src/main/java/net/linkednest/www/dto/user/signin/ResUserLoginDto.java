package net.linkednest.www.dto.user.signin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import net.linkednest.common.entity.Authority;
import net.linkednest.www.dto.CommonResDto;
import net.linkednest.www.dto.user.role.ResAdminMenuCategoryDto;
import net.linkednest.www.dto.user.role.ResAdminMenuRoleAccessPathDto;
import net.linkednest.www.dto.user.role.ResUserRoleDto;

import java.util.List;

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

    @Schema(description = "사용자 권한 목록", required = true)
    private List<Authority> authorities;

    @Schema(description = "사용자 접근 가능 URL", required = false)
    private List<ResAdminMenuRoleAccessPathDto> roleAccessPathList;

    private List<ResAdminMenuCategoryDto> adminMenuCategoryList;

    private List<ResUserRoleDto> userRoleDtoList;
}
