package net.linkednest.backoffice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.ResAuthorityDto;
import net.linkednest.backoffice.service.AdminAuthorityService;
import net.linkednest.common.entity.Authority;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin/userRole")
public class AdminAuthorityController {

    private final AdminAuthorityService adminAuthorityService;

    @RequestMapping(value = "list", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<List<ResAuthorityDto>> getUserRoleList() {
        return ResponseEntity.ok(adminAuthorityService.getUserRoleList());
    }
}
