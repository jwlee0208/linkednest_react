package net.linkednest.backoffice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import net.linkednest.backoffice.service.AdminUserService;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.dto.user.get.ResUserDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/admin/user")
@RequiredArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;
    @Operation(
            summary = "어드민 >> 유저 목록 조회 API",
            description = "어드민 >> 유저 목록 조회 API입니다.",
            tags = { "Admin User" },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "조회 성공",
                            content = @Content(
                                    schema = @Schema(implementation = User.class)
                            )
                    )
            }
    )
    @RequestMapping(value = "/list", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<List<ResUserDto>> getUserList(HttpServletRequest request) {
        List<ResUserDto> userList = adminUserService.userList();
        return ResponseEntity.ok(userList);
    }

    @Operation(
            summary = "어드민 >> 유저 상세 조회 API",
            description = "어드민 >> 유저 상세 조회 API입니다.",
            tags = { "Admin User" },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "조회 성공",
                            content = @Content(
                                    schema = @Schema(implementation = User.class)
                            )
                    )
            }
    )
    @GetMapping(value="/{userId}")
    public ResponseEntity<ResUserDto> getUserInfo(@PathVariable(name = "userId", required = true) String userId) {
        ResUserDto userInfo = adminUserService.getUser(StringUtils.defaultString(userId));
        return ResponseEntity.ok(userInfo);
    }
}
