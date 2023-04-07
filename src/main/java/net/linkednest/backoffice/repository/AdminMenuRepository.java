package net.linkednest.backoffice.repository;

import net.linkednest.common.entity.AdminMenu;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminMenuRepository extends JpaRepository<AdminMenu, Long> {
    List<AdminMenu> findAllByIsActive(boolean isActive, Sort adminMenuCategorySort);
}