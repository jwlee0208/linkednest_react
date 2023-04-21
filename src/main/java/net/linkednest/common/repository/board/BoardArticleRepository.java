package net.linkednest.common.repository.board;

import net.linkednest.common.entity.board.BoardArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardArticleRepository extends JpaRepository<BoardArticle, Long> {
}
