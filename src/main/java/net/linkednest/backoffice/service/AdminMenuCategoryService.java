package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.menu.ReqAdminMenuCategoryDto;
import net.linkednest.backoffice.dto.menu.ResAdminMenuCategoryDto;
import net.linkednest.common.repository.AdminMenuCategoryRepository;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.entity.menu.AdminMenuCategory;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.repository.UserRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminMenuCategoryService {
    private final UserRepository                userRepository;
    private final AdminMenuCategoryRepository   adminMenuCategoryRepository;

    public List<ResAdminMenuCategoryDto> getAdminMenuCategoryList() {
        List<ResAdminMenuCategoryDto> menuCategoryList = new ArrayList<>();
        adminMenuCategoryRepository.findAll().forEach(amcr -> {
            ResAdminMenuCategoryDto menuCategoryObj = new ResAdminMenuCategoryDto();
            menuCategoryObj.setCategoryId(amcr.getId());
            menuCategoryObj.setCategoryName(amcr.getCategoryName());
            menuCategoryObj.setIsActive(amcr.getIsActive());
            menuCategoryList.add(menuCategoryObj);
        });
        return menuCategoryList;
    }

    public ResAdminMenuCategoryDto save(ReqAdminMenuCategoryDto adminMenuCategoryObj) {
        long categoryId = (adminMenuCategoryObj.getCategoryId() == null) ? 0L : adminMenuCategoryObj.getCategoryId();
        int returnCode  = 10000;
        ResAdminMenuCategoryDto resAdminMenuCategoryObj = new ResAdminMenuCategoryDto();
        Optional<User>          userOptional            = userRepository.findById(categoryId > 0L
                ? adminMenuCategoryObj.getUpdateUser() : adminMenuCategoryObj.getCreateUser());
        User                    user                    = null;
        AdminMenuCategory       adminMenuCategory       = new AdminMenuCategory();
        AdminMenuCategory       savedObj                = null;
        if (categoryId > 0L) {
            Optional<AdminMenuCategory> adminMenuCategoryOptional = adminMenuCategoryRepository.findById(categoryId);
            if (adminMenuCategoryOptional.isPresent()) {
                adminMenuCategory = adminMenuCategoryOptional.get();
            }
        }
        if (userOptional.isPresent()) {
            user = userOptional.get();
            adminMenuCategory.setCategoryName(adminMenuCategoryObj.getCategoryName());
            adminMenuCategory.setIsActive(adminMenuCategoryObj.getIsActive());
            if (categoryId > 0L) {
                adminMenuCategory.setUpdateUser(user);
                adminMenuCategory.setUpdateDate(new Date());
            } else {
                adminMenuCategory.setCreateUser(user);
                adminMenuCategory.setCreateDate(new Date());
            }
            log.info("[{}.{}] adminMenuCategoryObj : {}", this.getClass().getName(), "save", adminMenuCategoryObj.toString());
            savedObj = adminMenuCategoryRepository.saveAndFlush(adminMenuCategory);
            if (ObjectUtils.isNotEmpty(savedObj)) {
                resAdminMenuCategoryObj.setCategoryId(savedObj.getId());
                resAdminMenuCategoryObj.setCategoryName(savedObj.getCategoryName());
            } else {
                returnCode = 50000;
            }
        } else {
            returnCode = 50000; // no user
        }

        resAdminMenuCategoryObj.setReturnCode(returnCode);
        resAdminMenuCategoryObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());

        return resAdminMenuCategoryObj;
    }

    public CommonResDto delete(ReqAdminMenuCategoryDto adminMenuCategoryObj) {

        CommonResDto commonResDto = new CommonResDto();
        int returnCode = 10000;
        try {
            Optional<AdminMenuCategory> adminMenuCategoryOptional = adminMenuCategoryRepository.findById(adminMenuCategoryObj.getCategoryId());
            if (adminMenuCategoryOptional.isPresent()) {
                adminMenuCategoryRepository.delete(adminMenuCategoryOptional.get());
            } else {
                returnCode = 50000;
            }
        } catch (Exception e) {
            log.error("[{}.{}] : err >> {}", this.getClass().getName(), "delete", e.getMessage());
            returnCode = 50000;
        }

        commonResDto.setReturnCode(returnCode);
        commonResDto.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        return commonResDto;
    }

    public AdminMenuCategory getAdminMenuCategory(Long categoryId) {
        Optional<AdminMenuCategory> adminMenuCategoryOptional = adminMenuCategoryRepository.findById(categoryId);
        return adminMenuCategoryOptional.orElse(null);
    }
}
