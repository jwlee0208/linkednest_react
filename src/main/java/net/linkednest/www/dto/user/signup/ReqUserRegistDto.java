package net.linkednest.www.dto.user.signup;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ReqUserRegistDto {
    @Schema(description = "사용자 아이디", required = true, example = "test01")
    private String userId;

    @Schema(description = "사용자 이메일", required = true, example = "test01@test.com")
    private String email;

    @Schema(description = "패스워드", required = true, minLength = 8, maxLength = 16, example = "asdf1234")
    private String password;
    @Schema(description = "사용자 닉네임", required = false, example = "nick01")
    private String nickname;

    @Schema(description = "사용자 소개", required = false)
    private String introduce;
    private String birthday;
    private String sex;
    private String phoneNo;
    private String additionalPhoneNo;
    private String address;
    private String detailAddress;
    private Integer zipcode;

}
