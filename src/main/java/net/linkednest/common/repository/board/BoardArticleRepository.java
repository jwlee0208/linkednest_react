package net.linkednest.common.repository.board;

import net.linkednest.common.entity.board.Board;
import net.linkednest.common.entity.board.BoardArticle;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardArticleRepository extends JpaRepository<BoardArticle, Long> {
    List<BoardArticle> findAllByBoard(Board board, Sort boardArticleSort);
}
