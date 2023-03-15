package net.linkednest.www.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class CommonResDto {
    @Schema(description = "응답코드", defaultValue = "10000", name = "returnCode", required = true)
    private int returnCode;
    @Schema(description = "응답메시지", defaultValue = "SUCCESS", name = "returnMsg", required = true)
    private String returnMsg;

}
