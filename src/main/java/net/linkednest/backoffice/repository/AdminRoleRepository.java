package net.linkednest.backoffice.repository;

import net.linkednest.common.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRoleRepository extends JpaRepository<Role, Long> {
}
