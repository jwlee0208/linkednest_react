package net.linkednest.backoffice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import net.linkednest.www.dto.user.signup.ResUserRegistDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/admin")
public class AdminIndexController {

    @GetMapping(value = {"/index", ""})
    @Operation(
            summary = "어드민 인덱스",
            description = "어드민 인덱스입니다.",
            tags = { "Admin Index Controller" },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "응답 성공",
                            content = @Content(
                                    schema = @Schema(implementation = String.class)
                            )
                    )
            }
    )
    public String index() {
        return "index";
    }
}
