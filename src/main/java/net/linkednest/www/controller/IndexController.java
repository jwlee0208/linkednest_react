package net.linkednest.www.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.www.dto.user.ResTokenDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
public class IndexController {

    @GetMapping("/index")
    @ResponseBody
    @Operation(
            summary = "Index",
            description = "Index",
            tags = { "Index Controller" },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Index",
                            content = @Content(
                                    schema = @Schema(implementation = String.class)
                            )
                    ),
            }
    )
    public String index() {return "index";}
}
