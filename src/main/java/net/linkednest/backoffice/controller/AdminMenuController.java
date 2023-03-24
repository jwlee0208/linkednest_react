package net.linkednest.backoffice.controller;

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
//@RequiredArgsConstructor
@RequestMapping(value = "/admin/menu")
public class AdminMenuController {
    @Autowired
    private AdminMenuService adminMenuService;

    @GetMapping(value = "/category/list")
    public ResponseEntity<List<AdminMenuCategory>> getAdminMenuCategoryList() {
        return ResponseEntity.ok(this.adminMenuService.getAdminMenuList());
    }
}
