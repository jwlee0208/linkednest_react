package net.linkednest.www.dto.user.regist;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import net.linkednest.www.dto.user.CommonResDto;

@Data
public class ResUserRegistDto extends CommonResDto {
    @Schema(description = "사용자 아이디", defaultValue = "test01@test.com", name = "username", required = true)
    private String username;
    @Schema(description = "사용자 닉네임", defaultValue = "nick01", name = "nickname", required = true)
    private String nickname;
}
