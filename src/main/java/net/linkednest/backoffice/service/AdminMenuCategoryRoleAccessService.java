package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.authority.ResMenuCategoryRoleAccessDto;
import net.linkednest.common.entity.menu.AdminMenuCategory;
import net.linkednest.common.entity.role.Role;
import net.linkednest.common.repository.admin.AdminMenuCategoryRoleAccessRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class AdminMenuCategoryRoleAccessService {
    private final AdminMenuCategoryRoleAccessRepository adminMenuCategoryRoleAccessRepository;

    public List<ResMenuCategoryRoleAccessDto> getAdminMenuCategoryRoleAccessList() {
        List<ResMenuCategoryRoleAccessDto> resList = new ArrayList<>();
        adminMenuCategoryRoleAccessRepository.findAll(Sort.by(Sort.Direction.ASC, "adminMenuCategoryId")).forEach(amcra -> {
            ResMenuCategoryRoleAccessDto resObj = new ResMenuCategoryRoleAccessDto();
            AdminMenuCategory amc = amcra.getAdminMenuCategory();
            Role r = amcra.getRole();
            resObj.setId(amcra.getId());
            resObj.setMenuCategoryId(amc.getId());
            resObj.setMenuCategoryName(amc.getCategoryName());
            resObj.setRoleId(r.getId());
            resObj.setRoleName(r.getRoleName());
            resList.add(resObj);
        });
        return resList;
    }

}
