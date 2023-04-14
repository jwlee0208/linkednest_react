package net.linkednest.common.repository;

import net.linkednest.common.entity.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, Long> {
    Optional<Content> findByContentCode(String contentCode);
    List<Content> findAllByIsActive(boolean isActive);
}
