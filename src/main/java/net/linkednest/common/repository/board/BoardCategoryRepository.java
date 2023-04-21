package net.linkednest.common.repository.board;

import net.linkednest.common.entity.board.BoardCategory;
import net.linkednest.common.entity.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardCategoryRepository extends JpaRepository<BoardCategory, Long> {
    List<BoardCategory> findAllByContentAndIsActive(Content content, Boolean isActive);
}
