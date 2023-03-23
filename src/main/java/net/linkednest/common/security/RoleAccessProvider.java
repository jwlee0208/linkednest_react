package net.linkednest.common.security;

import lombok.RequiredArgsConstructor;
import net.linkednest.backoffice.repository.RoleAccessPathRepository;
import net.linkednest.common.entity.RoleAccessPath;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RoleAccessProvider {

    private final RoleAccessPathRepository roleAccessPathRepository;

    public List<RoleAccessPath> getRoleAccessPathList() {
        return roleAccessPathRepository.findAll();
    }
}