package net.linkednest.www.dto.user.regist;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ResUserRegistDto {
    @Schema(description = "응답코드", defaultValue = "10000", name = "returnCode", required = true)
    private int returnCode;
    @Schema(description = "응답메시지", defaultValue = "SUCCESS", name = "returnMsg", required = true)
    private String returnMsg;
    @Schema(description = "사용자 아이디", defaultValue = "test01@test.com", name = "username", required = true)
    private String username;
    @Schema(description = "사용자 닉네임", defaultValue = "nick01", name = "nickname", required = true)
    private String nickname;
}
