package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.repository.AdminMenuCategoryRepository;
import net.linkednest.common.entity.AdminMenuCategory;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminMenuService {

    private final AdminMenuCategoryRepository adminMenuCategoryRepository;
    public List<AdminMenuCategory> getAdminMenuList() {
        return adminMenuCategoryRepository.findAll();
    }
}
