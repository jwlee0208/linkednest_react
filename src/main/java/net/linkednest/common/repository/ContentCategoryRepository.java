package net.linkednest.common.repository;

import net.linkednest.common.entity.content.ContentCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContentCategoryRepository extends JpaRepository<ContentCategory, Long> {

    List<ContentCategory> findAllByDepth(int depth);
    List<ContentCategory> findAllByParentId(Long parentId);
    Optional<ContentCategory> findByCategoryCode(String contentCategoryCode);
}
