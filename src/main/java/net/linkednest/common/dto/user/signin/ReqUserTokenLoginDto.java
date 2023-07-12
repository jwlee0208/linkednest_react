package net.linkednest.common.dto.user.signin;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReqUserTokenLoginDto {
    @Schema(description = "사용자 아이디", required = true, example = "test01")
    private String userId;
}
