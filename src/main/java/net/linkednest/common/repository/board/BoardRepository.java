package net.linkednest.common.repository.board;

import net.linkednest.common.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByBoardCode(String boardCode);
}
