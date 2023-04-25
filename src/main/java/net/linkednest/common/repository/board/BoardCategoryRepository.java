package net.linkednest.common.repository.board;

import net.linkednest.common.entity.board.BoardCategory;
import net.linkednest.common.entity.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardCategoryRepository extends JpaRepository<BoardCategory, Long> {
    List<BoardCategory> findAllByContentAndIsActive(Content content, Boolean isActive);

    Optional<BoardCategory> findByBoardCategoryCode(String boardCategoryCode);
}
