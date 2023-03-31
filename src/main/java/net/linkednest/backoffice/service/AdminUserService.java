package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.Authority;
import net.linkednest.common.entity.RoleAccessPath;
import net.linkednest.common.entity.User;
import net.linkednest.www.dto.user.get.ResUserDto;
import net.linkednest.www.dto.user.role.ResUserRoleAccessPathDto;
import net.linkednest.www.dto.user.role.ResUserRoleDto;
import net.linkednest.www.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository userRepository;

    public List<ResUserDto> userList() {

        List<ResUserDto> userList = new ArrayList<>();
        userRepository.findAll().stream().forEach(u -> {
            userList.add(this.getUser(u));
        });
        return userList;
    }

    public ResUserDto getUser(String userId) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (userOptional.isPresent()) {
            return this.getUser(userOptional.get());
        }
        return null;
    }
    private ResUserDto getUser(User u) {
        ResUserDto userObj = new ResUserDto();
        userObj.setUserNo(u.getUserNo());
        userObj.setUserId(u.getUserId());
        userObj.setEmail(u.getEmail());
        userObj.setNickname(u.getNickname());

        List<ResUserRoleDto> userRoleList = new ArrayList<>();
        u.getRoles().stream().forEach(r -> {
            userRoleList.add(this.getUserRole(r));
        });
        userObj.setUserRoleInfoList(userRoleList);
        return userObj;
    }

    private ResUserRoleDto getUserRole(Authority r) {
        ResUserRoleDto userRoleObj = new ResUserRoleDto();
        userRoleObj.setRoleName(r.getRole().getRoleName());
        userRoleObj.setRoleId(r.getRole().getId());
        List<ResUserRoleAccessPathDto> userRoleAccessPathList = new ArrayList<>();
        r.getRole().getAccessPaths().stream().forEach(ap -> {
            userRoleAccessPathList.add(this.getUserRoleAccessPath(ap));
        });
        userRoleObj.setUserRoleAccessPathList(userRoleAccessPathList);
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
