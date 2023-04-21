package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.board.ReqBoardArticleListDto;
import net.linkednest.www.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/board/article")
public class BoardArticleController {
    private final BoardService boardService;
    @PostMapping(value = "/list")
    public ResponseEntity getBoardList(ReqBoardArticleListDto reqBoardArticleListObj) {
        return ResponseEntity.ok(boardService.getBoardArticleList(reqBoardArticleListObj));
    }

}
