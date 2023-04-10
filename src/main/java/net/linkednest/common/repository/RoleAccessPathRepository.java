package net.linkednest.common.repository;

import net.linkednest.common.entity.RoleAccessPath;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleAccessPathRepository extends JpaRepository<RoleAccessPath, Long> {
    List<RoleAccessPath> findAllByType(String type);
}
