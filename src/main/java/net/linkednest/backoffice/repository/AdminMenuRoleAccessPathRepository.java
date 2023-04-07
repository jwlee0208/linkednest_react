package net.linkednest.backoffice.repository;

import net.linkednest.common.entity.AdminMenuRoleAccessPath;
import net.linkednest.common.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminMenuRoleAccessPathRepository extends JpaRepository<AdminMenuRoleAccessPath, Long> {
    List<AdminMenuRoleAccessPath> findAllByRoleId(Long roleId);
}
