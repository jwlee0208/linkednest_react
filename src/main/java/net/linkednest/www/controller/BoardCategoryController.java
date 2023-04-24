package net.linkednest.www.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.board.ResBoardCategoryDto;
import net.linkednest.www.service.BoardCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/board/category")
@RequiredArgsConstructor
public class BoardCategoryController {
    private final BoardCategoryService boardCategoryService;
    @GetMapping(value = "/list/{contentCode}")
    public ResponseEntity<List<ResBoardCategoryDto>> getBoardCategoryListForContent(@PathVariable String contentCode) {
        List<ResBoardCategoryDto> resBoardCategoryList = this.boardCategoryService.getContentBoardCategoryList(contentCode);
        return ResponseEntity.ok(resBoardCategoryList);
    }

    @GetMapping(value = "/detail/{boardCategoryCode}")
    public ResponseEntity<ResBoardCategoryDto> getBoardCategoryDetail(@PathVariable String boardCategoryCode) {
        return ResponseEntity.ok(this.boardCategoryService.getBoardCategoryDetail(boardCategoryCode));
    }
}
