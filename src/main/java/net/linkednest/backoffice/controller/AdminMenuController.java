package net.linkednest.backoffice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.service.AdminMenuService;
import net.linkednest.common.entity.AdminMenuCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin/menu")
public class AdminMenuController {
    private final AdminMenuService adminMenuService;

    @Operation(
        summary = "어드민 카테고리 & 메뉴 목록 조회 API",
        description = "어드민 카테고리 & 메뉴 목록 조회 API입니다.",
        tags = { "Admin Menu" },
        responses = {
          @ApiResponse(
            responseCode = "200",
            description = "조회 성공",
            content = @Content(
              schema = @Schema(implementation = AdminMenuCategory.class)
            )
          )
        }
      )
    @GetMapping(value = "/category/list")
    public ResponseEntity<List<AdminMenuCategory>> getAdminMenuCategoryList() {
        return ResponseEntity.ok(this.adminMenuService.getAdminMenuList());
    }
}
