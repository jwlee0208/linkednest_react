package net.linkednest.common.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import net.linkednest.common.dto.CommonResDto;

@Data
public class ResTokenDto extends CommonResDto {
    @Schema(description = "사용자 리프레시 토큰", required = true)
    private String refreshToken;
    @Schema(description = "사용자 액세스 토큰", required = true)
    private String accessToken;
}
