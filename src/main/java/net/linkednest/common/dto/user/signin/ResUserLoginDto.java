package net.linkednest.common.dto.user.signin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.backoffice.dto.menu.ResAdminMenuCategoryDto;
import net.linkednest.common.dto.authority.ResRoleDto;
import net.linkednest.common.dto.authority.ResUserRoleDto;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.dto.authority.ResAdminMenuRoleAccessPathDto;

import java.util.List;

@Getter
@Setter
@ToString(exclude = {"roleAccessPathList", "adminMenuCategoryList", "userRoleInfoList", "roleInfoList"})
public class ResUserLoginDto extends CommonResDto {
    @Schema(description = "사용자 아이디", defaultValue = "test01@test.com", name = "userId", required = true)
    private String userId;
    @Schema(description = "인증 토큰", defaultValue = "asdfqwetasd2asdf", name = "accessToken", required = false)
    private String accessToken;

    private Long userNo;
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

    @Schema(description = "사용자 접근 가능 URL", required = false)
    private List<ResAdminMenuRoleAccessPathDto> roleAccessPathList;

    private List<ResAdminMenuCategoryDto> adminMenuCategoryList;

    private List<ResUserRoleDto> userRoleInfoList;

    private List<ResRoleDto> roleInfoList;
}
