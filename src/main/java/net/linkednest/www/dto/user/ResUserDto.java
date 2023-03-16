package net.linkednest.www.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ResUserDto extends CommonResDto {
    @Schema(description = "사용자 시퀀스 번호", defaultValue = "", name = "userNo", required = true)
    private Long userNo;

    @Schema(description = "사용자 아이디", defaultValue = "test01", name = "userId", required = true)
    private String userId;

    @Schema(description = "사용자 닉네임", defaultValue = "nick01", name = "nickname", required = true)
    private String nickname;

    @Schema(description = "사용자 이메일", defaultValue = "test01@mail.com", name = "email", required = true)
    private String email;
}
