package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.dto.board.ReqBoardArticleDto;
import net.linkednest.common.dto.board.ReqBoardArticleListDto;
import net.linkednest.common.dto.board.ResBoardArticleDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.security.CustomUserDetails;
import net.linkednest.www.service.BoardArticleService;
import net.linkednest.www.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/board/article")
public class BoardArticleController {
    private final BoardService boardService;
    private final BoardArticleService boardArticleService;
    @PostMapping(value = "/list")
    public ResponseEntity<List<ResBoardArticleDto>> getBoardList(ReqBoardArticleListDto reqBoardArticleListObj) {
        return ResponseEntity.ok(boardArticleService.getBoardArticleList(reqBoardArticleListObj));
    }
    @PatchMapping(value = "")
    public ResponseEntity<CommonResDto> updateBoardArticle(ReqBoardArticleDto reqBoardArticleObj, @AuthenticationPrincipal Authentication authentication) {
        CustomUserDetails userDetailsObj = (CustomUserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(this.boardArticleService.editBoardArticle(reqBoardArticleObj, userDetailsObj.getUser()));
    }
    @PostMapping(value = "")
    public ResponseEntity<CommonResDto> writeBoardArticle(ReqBoardArticleDto reqBoardArticleObj, @AuthenticationPrincipal Authentication authentication) {
        CustomUserDetails userDetailsObj = (CustomUserDetails) authentication.getPrincipal();
        return ResponseEntity.ok(this.boardArticleService.editBoardArticle(reqBoardArticleObj, userDetailsObj.getUser()));
    }
}
