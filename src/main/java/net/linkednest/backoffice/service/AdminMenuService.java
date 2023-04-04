package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.ReqAdminMenuCategoryDto;
import net.linkednest.backoffice.dto.ResAdminMenuCategoryDto;
import net.linkednest.backoffice.repository.AdminMenuCategoryRepository;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.entity.AdminMenuCategory;
import net.linkednest.common.entity.User;
import net.linkednest.www.dto.CommonResDto;
import net.linkednest.www.repository.UserProfileRepository;
import net.linkednest.www.repository.UserRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminMenuService {

    private final UserRepository userRepository;
    private final AdminMenuCategoryRepository adminMenuCategoryRepository;
    public List<ResAdminMenuCategoryDto> getAdminMenuList() {
        List<ResAdminMenuCategoryDto> menuCategoryList = new ArrayList<>();
        adminMenuCategoryRepository.findAll().stream().forEach(amcr -> {
            ResAdminMenuCategoryDto menuCategoryObj = new ResAdminMenuCategoryDto();
            menuCategoryObj.setCategoryId(amcr.getId());
            menuCategoryObj.setCategoryName(amcr.getCategoryName());
            menuCategoryObj.setIsActive(amcr.getIsActive());
            menuCategoryList.add(menuCategoryObj);
        });
        return menuCategoryList;
    }

    public ResAdminMenuCategoryDto save(ReqAdminMenuCategoryDto adminMenuCategoryObj) {
        User              user              = null;
        AdminMenuCategory adminMenuCategory = new AdminMenuCategory();
        AdminMenuCategory savedObj          = null;
        long categoryId = (adminMenuCategoryObj.getCategoryId() == null) ? 0L : adminMenuCategoryObj.getCategoryId();
        int returnCode = 10000;
        if (categoryId > 0L) {
            Optional<AdminMenuCategory> adminMenuCategoryOptional = adminMenuCategoryRepository.findById(categoryId);
            if (adminMenuCategoryOptional.isPresent()) {
                adminMenuCategory = adminMenuCategoryOptional.get();
            }
        }
        Optional<User> userOptional = userRepository.findById(categoryId > 0L ? adminMenuCategoryObj.getUpdateUser() : adminMenuCategoryObj.getCreateUser());
        if (userOptional.isPresent()) {
            user = userOptional.get();
        }

        if (user != null) {
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
        }

        ResAdminMenuCategoryDto resAdminMenuCategoryObj = new ResAdminMenuCategoryDto();
        if (ObjectUtils.isNotEmpty(savedObj)) {
            resAdminMenuCategoryObj.setCategoryId(savedObj.getId());
            resAdminMenuCategoryObj.setCategoryName(savedObj.getCategoryName());
        } else {
            returnCode = 50000;
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
            log.error("[][] : err >> {}", this.getClass().getName(), "delete", e.getMessage());
            returnCode = 50000;
        }

        commonResDto.setReturnCode(returnCode);
        commonResDto.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        return commonResDto;
    }
}
