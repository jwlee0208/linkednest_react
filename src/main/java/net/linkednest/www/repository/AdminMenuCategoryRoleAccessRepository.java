package net.linkednest.www.repository;

import net.linkednest.common.entity.AdminMenuCategoryRoleAccess;
import net.linkednest.common.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminMenuCategoryRoleAccessRepository extends JpaRepository<AdminMenuCategoryRoleAccess, Long> {
    List<AdminMenuCategoryRoleAccess> findAllByRole(Role r);
}
