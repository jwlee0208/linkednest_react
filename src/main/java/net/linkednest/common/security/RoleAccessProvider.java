package net.linkednest.common.security;

import lombok.RequiredArgsConstructor;
import net.linkednest.common.entity.role.RoleAccessPath;
import net.linkednest.common.repository.RoleAccessPathRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RoleAccessProvider {

    private final RoleAccessPathRepository roleAccessPathRepository;

    public List<RoleAccessPath> getRoleAccessPathList() {
        return roleAccessPathRepository.findAllByType("BACKEND");
    }

    public List<String> getUserRoleList() {
        List<String> userRoleList = new ArrayList<>();
        List<RoleAccessPath> roleAccessPathList = this.getRoleAccessPathList();
        roleAccessPathList.stream().distinct();
        for(RoleAccessPath roleAccessPath : roleAccessPathList) {
            userRoleList.add(roleAccessPath.getRole().getRoleName());
        }
        return userRoleList;
    }
}
