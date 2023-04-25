package net.linkednest.common.repository.board;

import net.linkednest.common.entity.board.Board;
import net.linkednest.common.entity.board.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByBoardCode(String boardCode);

    List<Board> findAllByBoardCategory(BoardCategory boardCategory);
}
