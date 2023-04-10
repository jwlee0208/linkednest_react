package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.authority.ReqMenuCategoryRoleAccessDto;
import net.linkednest.backoffice.dto.authority.ResMenuCategoryRoleAccessDto;
import net.linkednest.backoffice.dto.menu.ReqAdminMenuAccessPathDto;
import net.linkednest.backoffice.dto.menu.ResAdminMenuAccessPathDto;
import net.linkednest.backoffice.dto.authority.ResAuthorityDto;
import net.linkednest.common.repository.*;
import net.linkednest.backoffice.repository.AdminRoleRepository;
import net.linkednest.common.CommonConstants;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.entity.*;
import net.linkednest.www.dto.CommonResDto;
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
public class AdminAuthorityService {

    private final AdminMenuService                      adminMenuService;
    private final AdminMenuCategoryService              adminMenuCategoryService;
    private final AuthorityRepository                   authorityRepository;
    private final UserRepository                        userRepository;
    private final AdminMenuRoleAccessPathRepository     adminMenuRoleAccessPathRepository;
    private final AdminMenuCategoryRoleAccessRepository adminMenuCategoryRoleAccessRepository;
    private final RoleRepository                        roleRepository;

    public List<ResAuthorityDto> getUserRoleList() {

        List<ResAuthorityDto> userRoleList = new ArrayList<>();
        this.authorityRepository.findAll().stream().forEach(a -> {
            ResAuthorityDto resAuthorityDto = new ResAuthorityDto();
            resAuthorityDto.setRoleId(a.getRole().getId());
            resAuthorityDto.setRoleName(a.getRole().getRoleName());
            resAuthorityDto.setUserId(a.getUser().getUserId());
            resAuthorityDto.setUserNo(a.getUser().getUserNo());
            userRoleList.add(resAuthorityDto);
        });

        return userRoleList;
    }

    public List<ResAdminMenuAccessPathDto> getMenuRoleList() {
        List<ResAdminMenuAccessPathDto> resList = new ArrayList<>();
        adminMenuRoleAccessPathRepository.findAll(Sort.by(Sort.Direction.DESC, "adminMenu")).stream().forEach(amrap -> {
            ResAdminMenuAccessPathDto   resObj  = new ResAdminMenuAccessPathDto();
            AdminMenu                   amObj   = amrap.getAdminMenu();
            AdminMenuCategory           amcObj  = amObj.getAdminMenuCategory();
            Role                        roleObj = amrap.getRole();

            resObj.setId(amrap.getId());
            resObj.setMenuId(amObj.getId());
            resObj.setMenuName(amObj.getMenuName());
            resObj.setMenuUrl(amObj.getMenuUrl());
            resObj.setMenuCategoryId(amcObj.getId());
            resObj.setMenuCategoryName(amcObj.getCategoryName());
            resObj.setRoleId(roleObj.getId());
            resObj.setRoleName(roleObj.getRoleName());
            resList.add(resObj);
        });
        return resList;
    }

    public ResAdminMenuAccessPathDto editMenuRole(ReqAdminMenuAccessPathDto reqAdminMenuAccessPathObj) {
        ResAdminMenuAccessPathDto resObj = new ResAdminMenuAccessPathDto();

        int     returnCode  = 10000;
        Long    menuRoleId  = reqAdminMenuAccessPathObj.getId();
        String  editType    = ObjectUtils.isEmpty(menuRoleId) ? CommonConstants.ACTION_CREATE : CommonConstants.ACTION_UPDATE;

        try {
            AdminMenuRoleAccessPath amrap = new AdminMenuRoleAccessPath();
            Optional<User> editUserOptional = userRepository.findById(StringUtils.equals(editType, CommonConstants.ACTION_CREATE)
                    ? reqAdminMenuAccessPathObj.getCreateUserNo() : reqAdminMenuAccessPathObj.getUpdateUserNo());
            if (editUserOptional.isPresent()) {
                User editUser = editUserOptional.get();
                if (StringUtils.equals(editType, CommonConstants.ACTION_UPDATE)) {
                    Optional<AdminMenuRoleAccessPath> amrapOptional = adminMenuRoleAccessPathRepository.findById(menuRoleId);
                    if (amrapOptional.isPresent()) {
                        amrap = amrapOptional.get();

                        amrap.setUpdateUser(editUser);
                        amrap.setUpdateDate(new Date());
                    } else {
                        returnCode = 50000;
                    }
                } else {
                    amrap.setCreateUser(editUser);
                    amrap.setCreateDate(new Date());
                }
                amrap.setAdminMenu(adminMenuService.getAdminMenu(reqAdminMenuAccessPathObj.getMenuId()));
                amrap.setRole(this.getRole(reqAdminMenuAccessPathObj.getRoleId()));

                AdminMenuRoleAccessPath savedObj = adminMenuRoleAccessPathRepository.saveAndFlush(amrap);
                resObj.setMenuUrl(savedObj.getAdminMenu().getMenuUrl());
                resObj.setMenuName(savedObj.getAdminMenu().getMenuName());
                resObj.setRoleId(savedObj.getRole().getId());
                resObj.setRoleName(savedObj.getRole().getRoleName());
                resObj.setMenuCategoryId(savedObj.getAdminMenu().getAdminMenuCategory().getId());
                resObj.setMenuCategoryName(savedObj.getAdminMenu().getAdminMenuCategory().getCategoryName());
                resObj.setId(savedObj.getId());
            } else {
                returnCode = 50000;
            }
        } catch (Exception e) {
            log.error("[{}.{}] err : {}", this.getClass().getName(), "editMenuRole", e.getMessage());
            returnCode = 50000;
        }
        resObj.setReturnCode(returnCode);
        resObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        return resObj;
    }

    public CommonResDto deleteMenuRole(ReqAdminMenuAccessPathDto reqAdminMenuAccessPathObj) {
        CommonResDto resObj = new CommonResDto();
        int returnCode = 10000;
        try {
            Optional<AdminMenuRoleAccessPath> amrapOptional = adminMenuRoleAccessPathRepository.findById(reqAdminMenuAccessPathObj.getId());
            if (amrapOptional.isPresent()) {
                try {
                    adminMenuRoleAccessPathRepository.delete(amrapOptional.get());
                } catch (Exception e) {
                    returnCode = 50000;
                }
            } else {
                returnCode = 50000;
            }
        } catch (Exception e) {
            returnCode = 50000;
        }
        resObj.setReturnCode(returnCode);
        resObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        return resObj;
    }

    private Role getRole(Long roleId) {
        Optional<Role> roleOptional = roleRepository.findById(roleId);
        if (roleOptional.isPresent()) {
            return roleOptional.get();
        }
        return null;
    }

    public ResMenuCategoryRoleAccessDto editCategoryRole(ReqMenuCategoryRoleAccessDto reqMenuCategoryRoleAccessObj) {
        ResMenuCategoryRoleAccessDto resObj = new ResMenuCategoryRoleAccessDto();
        int     returnCode               = 10000;
        Long    menuCategoryRoleAccessId = reqMenuCategoryRoleAccessObj.getId();
        String  editType                 = ObjectUtils.isEmpty(menuCategoryRoleAccessId) ? CommonConstants.ACTION_CREATE : CommonConstants.ACTION_UPDATE;

        try {
            AdminMenuCategoryRoleAccess amcra = new AdminMenuCategoryRoleAccess();
            Optional<User> editUserOptional = userRepository.findById(StringUtils.equals(editType, "CREATE")
                    ? reqMenuCategoryRoleAccessObj.getCreateUserNo() : reqMenuCategoryRoleAccessObj.getUpdateUserNo());
            if (editUserOptional.isPresent()) {
                User editUser = editUserOptional.get();
                if (StringUtils.equals(editType, CommonConstants.ACTION_UPDATE)) {
                    Optional<AdminMenuCategoryRoleAccess> amcraOptional = adminMenuCategoryRoleAccessRepository.findById(menuCategoryRoleAccessId);
                    if (amcraOptional.isPresent()) {
                        amcra = amcraOptional.get();

                        amcra.setUpdateUser(editUser);
                        amcra.setUpdateDate(new Date());
                    } else {
                        returnCode = 50000;
                    }
                } else {
                    amcra.setCreateUser(editUser);
                    amcra.setCreateDate(new Date());
                }
                amcra.setAdminMenuCategory(adminMenuCategoryService.getAdminMenuCategory(reqMenuCategoryRoleAccessObj.getMenuCategoryId()));
                amcra.setRole(this.getRole(reqMenuCategoryRoleAccessObj.getRoleId()));

                AdminMenuCategoryRoleAccess savedObj = adminMenuCategoryRoleAccessRepository.saveAndFlush(amcra);
                resObj.setRoleId(savedObj.getRole().getId());
                resObj.setRoleName(savedObj.getRole().getRoleName());
                resObj.setMenuCategoryId(savedObj.getAdminMenuCategory().getId());
                resObj.setMenuCategoryName(savedObj.getAdminMenuCategory().getCategoryName());
                resObj.setId(savedObj.getId());
            } else {
                returnCode = 50000;
            }
        } catch (Exception e) {
            log.error("[{}.{}] err : {}", this.getClass().getName(), "editCategoryRole", e.getMessage());
            returnCode = 50000;
        }
        resObj.setReturnCode(returnCode);
        resObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());

        return resObj;
    }
    public CommonResDto deleteCategoryRole(ReqMenuCategoryRoleAccessDto reqMenuCategoryRoleAccessObj) {
        int returnCode = 10000;
        CommonResDto resObj = new CommonResDto();
        // to-do
        try {
            Optional<AdminMenuCategoryRoleAccess> amcraOptional = adminMenuCategoryRoleAccessRepository.findById(reqMenuCategoryRoleAccessObj.getId());
            if (amcraOptional.isPresent()) {
                try {
                    adminMenuCategoryRoleAccessRepository.delete(amcraOptional.get());
                } catch (Exception e) {
                    returnCode = 50000;
                }
            } else {
                returnCode = 50000;
            }
        } catch (Exception e) {
            returnCode = 50000;
        }
        resObj.setReturnCode(returnCode);
        resObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        return resObj;
    }
}
