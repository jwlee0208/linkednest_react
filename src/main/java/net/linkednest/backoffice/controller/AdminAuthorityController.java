package net.linkednest.backoffice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.ReqAdminMenuAccessPathDto;
import net.linkednest.backoffice.dto.ResAdminMenuAccessPathDto;
import net.linkednest.backoffice.dto.ResAuthorityDto;
import net.linkednest.backoffice.service.AdminAuthorityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin/role")
public class AdminAuthorityController {

    private final AdminAuthorityService adminAuthorityService;

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
}
