package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.authority.ResRoleDto;
import net.linkednest.common.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminRoleService {
    private final RoleRepository roleRepository;
    public List<ResRoleDto> getRoleList() {
        List<ResRoleDto> resRoleList = new ArrayList<>();
        roleRepository.findAll().stream().forEach(r -> {
            ResRoleDto resRoleObj = new ResRoleDto();
            resRoleObj.setRoleId(r.getId());
            resRoleObj.setRoleName(r.getRoleName());
            resRoleObj.setRoleDesc(r.getRoleDescription());
            resRoleList.add(resRoleObj);
        });
        return resRoleList;
    }
}
