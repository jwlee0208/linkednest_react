package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.menu.ResAdminMenuCategoryDto;
import net.linkednest.common.dto.user.get.ResUserDto;
import net.linkednest.common.dto.authority.ResUserRoleAccessPathDto;
import net.linkednest.common.dto.authority.ResUserRoleDto;
import net.linkednest.common.dto.user.signup.ResUserProfileDto;
import net.linkednest.common.entity.role.Authority;
import net.linkednest.common.entity.role.Role;
import net.linkednest.common.entity.role.RoleAccessPath;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.entity.user.UserProfile;
import net.linkednest.common.repository.user.UserProfileRepository;
import net.linkednest.common.repository.user.UserRepository;
import net.linkednest.common.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository        userRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserService           userService;

    public List<ResUserDto> userList() {
        List<ResUserDto> userList = new ArrayList<>();
        userRepository.findAll().forEach(u -> {
            userList.add(this.getUser(u));
        });
        return userList;
    }
    public ResUserDto getUser(String userId) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        return userOptional.map(this::getUser).orElse(null);
    }
    private ResUserDto getUser(User u) {
        ResUserDto userObj = new ResUserDto();
        userObj.setUserNo(u.getUserNo());
        userObj.setUserId(u.getUserId());
        userObj.setEmail(u.getEmail());
        userObj.setNickname(u.getNickname());
        userObj.setIntroduce((u.getIntroduce()));
        userObj.setUserProfile(this.getUserProfile(u));

        List<ResUserRoleDto> userRoleList = new ArrayList<>();
        u.getUserRoles().forEach(r -> {
            userRoleList.add(this.getUserRole(r));
        });
        userObj.setUserRoleInfoList(userRoleList);

        return userObj;
    }
    private ResUserProfileDto getUserProfile(User u) {
        Optional<UserProfile> upOptional = userProfileRepository.findByUser(u);
        ResUserProfileDto userProfileObj = new ResUserProfileDto();
        if (upOptional.isPresent()){
            UserProfile up = upOptional.get();
            userProfileObj.setSex(up.getSex());
            userProfileObj.setBirthday(up.getBirthday());
            userProfileObj.setPhoneNo(up.getPhoneNo());
        }
        return userProfileObj;
    }
    private ResUserRoleDto getUserRole(Authority r) {
        ResUserRoleDto userRoleObj = new ResUserRoleDto();
        userRoleObj.setRoleName(r.getRole().getRoleName());
        userRoleObj.setRoleId(r.getRole().getId());
        // user menu role(for back-end)
        Role role = r.getRole();
        List<ResUserRoleAccessPathDto> userRoleAccessPathList = new ArrayList<>();
        role.getAccessPaths().forEach(ap -> {
            userRoleAccessPathList.add(this.getUserRoleAccessPath(ap));
        });
        userRoleObj.setUserRoleAccessPathList(userRoleAccessPathList);

        // user menu role(for front-end)
        List<ResAdminMenuCategoryDto> adminMenuCategoryList = new ArrayList<>();
        userService.setAdminMenuCategoryList(r, adminMenuCategoryList);
        userRoleObj.setAdminMenuCategoryList(adminMenuCategoryList);
        return userRoleObj;
    }
    private ResUserRoleAccessPathDto getUserRoleAccessPath(RoleAccessPath ap) {
        ResUserRoleAccessPathDto userRoleAccessPathObj = new ResUserRoleAccessPathDto();
        userRoleAccessPathObj.setHttpMethod(ap.getHttpMethod());
        userRoleAccessPathObj.setUrl(ap.getUrl());
        userRoleAccessPathObj.setType(ap.getType());
        return userRoleAccessPathObj;
    }

}
