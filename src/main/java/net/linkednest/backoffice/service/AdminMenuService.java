package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.menu.ReqAdminMenuDto;
import net.linkednest.backoffice.dto.menu.ResAdminMenuDto;
import net.linkednest.common.repository.AdminMenuRepository;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.entity.AdminMenu;
import net.linkednest.common.entity.AdminMenuCategory;
import net.linkednest.common.entity.User;
import net.linkednest.www.dto.CommonResDto;
import net.linkednest.common.repository.UserRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminMenuService {
    private final AdminMenuRepository       adminMenuRepository;
    private final UserRepository            userRepository;
    private final AdminMenuCategoryService  adminMenuCategoryService;
    public List<ResAdminMenuDto> getAdminMenuList() {
        List<ResAdminMenuDto> adminMenuList = new ArrayList<>();
        adminMenuRepository.findAllByIsActive(true, Sort.by(Sort.Direction.DESC, "adminMenuCategory")).forEach(amr -> {
            ResAdminMenuDto adminMenuObj = new ResAdminMenuDto();
            adminMenuObj.setId(amr.getId());
            adminMenuObj.setName(amr.getMenuName());
            adminMenuObj.setUrl(amr.getMenuUrl());
            adminMenuObj.setShow(amr.getIsShow());
            adminMenuObj.setCategoryName(amr.getAdminMenuCategory().getCategoryName());
            adminMenuObj.setCategoryId(amr.getAdminMenuCategory().getId());
            adminMenuList.add(adminMenuObj);
        });
        return adminMenuList;
    }

    public AdminMenu getAdminMenu(Long menuId) {
        Optional<AdminMenu> adminMenuOptional = this.adminMenuRepository.findById(menuId);
        if (adminMenuOptional.isPresent()) {
            return adminMenuOptional.get();
        }
        return null;
    }

    public CommonResDto deleteAdminMenu(ReqAdminMenuDto reqAdminMenuObj) {
        int returnCode = 10000;
        Optional<AdminMenu> adminMenuOptional = adminMenuRepository.findById(reqAdminMenuObj.getId());
        CommonResDto resObj = new CommonResDto();
        if (adminMenuOptional.isPresent()) {
            AdminMenu adminMenu = adminMenuOptional.get();
            adminMenu.setIsActive(false);
            try {
                AdminMenu savedObj = adminMenuRepository.saveAndFlush(adminMenu);
                if (ObjectUtils.isEmpty(savedObj)) {
                    returnCode = 50000;
                }
            } catch (Exception e) {
                e.printStackTrace();
                returnCode = 50000;
            }
        }
        resObj.setReturnCode(returnCode);
        resObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        return resObj;
    }

    public ResAdminMenuDto editAdminMenu(ReqAdminMenuDto reqAdminMenuObj) {
        int returnCode = 10000;
        Long    menuId      = reqAdminMenuObj.getId();
        String  editType    = ObjectUtils.isNotEmpty(menuId) && menuId > 0L ? "UPDATE" : "CREATE";

        ResAdminMenuDto resAdminMenuObj = new ResAdminMenuDto();
        Optional<User> userOptional = userRepository.findById(StringUtils.equals(editType, "CREATE")
                ? reqAdminMenuObj.getCreateUser() : reqAdminMenuObj.getUpdateUser());
        if (userOptional.isPresent()) {
            AdminMenu   adminMenu   = new AdminMenu();
            User        editUser    = userOptional.get();

            AdminMenuCategory adminMenuCategory = adminMenuCategoryService.getAdminMenuCategory(reqAdminMenuObj.getCategoryId());

            if (StringUtils.equals(editType, "UPDATE")) {
                Optional<AdminMenu> adminMenuOptional = adminMenuRepository.findById(menuId);
                if (adminMenuOptional.isPresent()) {
                    adminMenu = adminMenuOptional.get();
                    adminMenu.setUpdateDate(new Date());
                    adminMenu.setUpdateUser(editUser);
                }
            } else {
                adminMenu.setCreateDate(new Date());
                adminMenu.setCreateUser(editUser);
                adminMenu.setIsActive(true);
            }
            adminMenu.setAdminMenuCategory(adminMenuCategory);
            adminMenu.setMenuName(reqAdminMenuObj.getName());
            adminMenu.setMenuUrl(reqAdminMenuObj.getUrl());
            adminMenu.setIsShow(reqAdminMenuObj.getShow());

            try {
                AdminMenu savedObj = adminMenuRepository.saveAndFlush(adminMenu);
                if (ObjectUtils.isNotEmpty(savedObj)) {
                    resAdminMenuObj.setCategoryName(savedObj.getAdminMenuCategory().getCategoryName());
                    resAdminMenuObj.setId(savedObj.getId());
                    resAdminMenuObj.setName(savedObj.getMenuName());
                    resAdminMenuObj.setUrl(savedObj.getMenuUrl());
                    resAdminMenuObj.setCategoryId(savedObj.getAdminMenuCategory().getId());
                    resAdminMenuObj.setShow(savedObj.getIsShow());
                }
            } catch (Exception e) {
                log.error("[].[] error : {}", this.getClass().getName(), "createAdminMenu", e.getMessage());
                returnCode = 50000;
            }
        } else {
            returnCode = 50000;
        }
        resAdminMenuObj.setReturnCode(returnCode);
        resAdminMenuObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());

        return resAdminMenuObj;
    }
}
