package net.linkednest.backoffice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.role.ReqUserRoleDto;
import net.linkednest.backoffice.dto.role.ResUserRoleDto;
import net.linkednest.common.dto.authority.*;
import net.linkednest.backoffice.dto.menu.ReqAdminMenuAccessPathDto;
import net.linkednest.backoffice.dto.menu.ResAdminMenuAccessPathDto;
import net.linkednest.backoffice.service.AdminAuthorityService;
import net.linkednest.backoffice.service.AdminMenuCategoryRoleAccessService;
import net.linkednest.backoffice.service.AdminRoleService;
import net.linkednest.common.dto.CommonResDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin/role")
public class AdminAuthorityController {
    private final AdminRoleService                   adminRoleService;
    private final AdminAuthorityService              adminAuthorityService;
    private final AdminMenuCategoryRoleAccessService adminMenuCategoryRoleAccessService;

    @RequestMapping(value = "/user/list", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<List<ResAuthorityDto>> getUserRoleList() {
        return ResponseEntity.ok(adminAuthorityService.getUserRoleList());
    }

    @RequestMapping(value = "/menu/list", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<List<ResAdminMenuAccessPathDto>> getMenuRoleList() {
        return ResponseEntity.ok(this.adminAuthorityService.getMenuRoleList());
    }

    @PostMapping(value = "/menu")
    public ResponseEntity<ResAdminMenuAccessPathDto> createMenuRole(ReqAdminMenuAccessPathDto reqAdminMenuAccessPathObj) {
        return ResponseEntity.ok(this.adminAuthorityService.editMenuRole(reqAdminMenuAccessPathObj));
    }

    @PatchMapping(value = "/menu")
    public ResponseEntity<ResAdminMenuAccessPathDto> updateMenuRole(ReqAdminMenuAccessPathDto reqAdminMenuAccessPathObj) {
        return ResponseEntity.ok(this.adminAuthorityService.editMenuRole(reqAdminMenuAccessPathObj));
    }

    @DeleteMapping(value = "/menu")
    public ResponseEntity<CommonResDto> deleteMenuRole(ReqAdminMenuAccessPathDto reqAdminMenuAccessPathObj) {
        return ResponseEntity.ok((this.adminAuthorityService.deleteMenuRole(reqAdminMenuAccessPathObj)));
    }

    @GetMapping(value = "/list")
    public ResponseEntity<List<ResRoleDto>> getRoleList() {
        return ResponseEntity.ok(adminRoleService.getRoleList());
    }

    @GetMapping(value = "/category/list")
    public ResponseEntity<List<ResMenuCategoryRoleAccessDto>> getCategoryRoleList() {
        return ResponseEntity.ok(adminMenuCategoryRoleAccessService.getAdminMenuCategoryRoleAccessList());
    }

    @PostMapping(value = "/category")
    public ResponseEntity<ResMenuCategoryRoleAccessDto> createCategoryRole(ReqMenuCategoryRoleAccessDto reqMenuCategoryRoleAccessObj) {
        return ResponseEntity.ok(this.adminAuthorityService.editCategoryRole(reqMenuCategoryRoleAccessObj));
    }

    @PatchMapping(value = "/category")
    public ResponseEntity<ResMenuCategoryRoleAccessDto> updateCategoryRole(ReqMenuCategoryRoleAccessDto reqMenuCategoryRoleAccessObj) {
        return ResponseEntity.ok(this.adminAuthorityService.editCategoryRole(reqMenuCategoryRoleAccessObj));
    }

    @DeleteMapping(value = "/category")
    public ResponseEntity<CommonResDto> deleteCategoryRole(ReqMenuCategoryRoleAccessDto reqMenuCategoryRoleAccessObj) {
        return ResponseEntity.ok((this.adminAuthorityService.deleteCategoryRole(reqMenuCategoryRoleAccessObj)));
    }

    @PostMapping(value = "")
    public ResponseEntity<ResRoleDto> createRole(ReqRoleDto reqRoleObj) {
        return ResponseEntity.ok(adminAuthorityService.editRole(reqRoleObj));
    }

    @PatchMapping(value = "")
    public ResponseEntity<ResRoleDto> updateRole(ReqRoleDto reqRoleObj) {
        return ResponseEntity.ok(adminAuthorityService.editRole(reqRoleObj));
    }

    @DeleteMapping(value = "")
    public ResponseEntity<CommonResDto> deleteRole(ReqRoleDto reqRoleObj) {
        return ResponseEntity.ok(adminAuthorityService.deleteRole(reqRoleObj));
    }

    @PostMapping(value = "/user")
    public ResponseEntity<ResUserRoleDto> editUserRole(ReqUserRoleDto reqUserRoleObj) {
        return ResponseEntity.ok(adminAuthorityService.editUserRole(reqUserRoleObj));
    }
}
