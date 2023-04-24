package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.board.ResBoardDto;
import net.linkednest.www.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/board")
public class BoardController {
    private final BoardService boardService;

    @GetMapping(value = "/detail/{boardCode}")
    public ResponseEntity<ResBoardDto> getBoardDetail(@PathVariable String boardCode) {
        return ResponseEntity.ok(this.boardService.getBoardDetail(boardCode));
    }

}
