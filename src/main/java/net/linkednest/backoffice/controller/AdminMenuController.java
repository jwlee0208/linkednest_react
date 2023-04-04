package net.linkednest.backoffice.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.ReqAdminMenuCategoryDto;
import net.linkednest.backoffice.dto.ResAdminMenuCategoryDto;
import net.linkednest.backoffice.service.AdminMenuService;
import net.linkednest.common.entity.AdminMenuCategory;
import net.linkednest.www.dto.CommonResDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<ResAdminMenuCategoryDto>> getAdminMenuCategoryList() {
        return ResponseEntity.ok(this.adminMenuService.getAdminMenuList());
    }

    @Operation(
            summary = "어드민 카테고리 & 메뉴 생성 API",
            description = "어드민 카테고리 & 메뉴 생성 API입니다.",
            tags = { "Admin Menu" },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "생성 성공",
                            content = @Content(
                                    schema = @Schema(implementation = ResAdminMenuCategoryDto.class)
                            )
                    )
            }
    )
    @PostMapping(value = "/category")
    public ResponseEntity<ResAdminMenuCategoryDto> createAdminMenuCategory(ReqAdminMenuCategoryDto adminMenuCategoryObj) {
        return ResponseEntity.ok(this.adminMenuService.save(adminMenuCategoryObj));
    }

    @Operation(
            summary = "어드민 카테고리 & 메뉴 갱신 API",
            description = "어드민 카테고리 & 메뉴 갱신 API입니다.",
            tags = { "Admin Menu" },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "갱신 성공",
                            content = @Content(
                                    schema = @Schema(implementation = ResAdminMenuCategoryDto.class)
                            )
                    )
            }
    )
    @PatchMapping(value = "/category")
    public ResponseEntity<ResAdminMenuCategoryDto> updateAdminMenuCategory(ReqAdminMenuCategoryDto adminMenuCategoryObj) {
        return ResponseEntity.ok(this.adminMenuService.save(adminMenuCategoryObj));
    }

    @Operation(
            summary = "어드민 카테고리 & 메뉴 삭제 API",
            description = "어드민 카테고리 & 메뉴 삭제 API입니다.",
            tags = { "Admin Menu" },
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "삭제 성공",
                            content = @Content(
                                    schema = @Schema(implementation = CommonResDto.class)
                            )
                    )
            }
    )
    @DeleteMapping(value = "/category")
    public ResponseEntity<CommonResDto> deleteAdminMenuCategory(ReqAdminMenuCategoryDto adminMenuCategoryObj) {
        return ResponseEntity.ok(this.adminMenuService.delete(adminMenuCategoryObj));
    }
}
