package net.linkednest.common.repository;

import net.linkednest.common.entity.menu.AdminMenuCategoryRoleAccess;
import net.linkednest.common.entity.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminMenuCategoryRoleAccessRepository extends JpaRepository<AdminMenuCategoryRoleAccess, Long> {
    List<AdminMenuCategoryRoleAccess> findAllByRole(Role r);
}
