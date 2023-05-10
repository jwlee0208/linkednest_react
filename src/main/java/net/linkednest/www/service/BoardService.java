package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.board.ReqBoardArticleListDto;
import net.linkednest.common.dto.board.ResBoardArticleDto;
import net.linkednest.common.dto.board.ResBoardDto;
import net.linkednest.common.entity.board.Board;
import net.linkednest.common.entity.board.BoardArticle;
import net.linkednest.common.entity.board.BoardCategory;
import net.linkednest.common.repository.board.BoardArticleRepository;
import net.linkednest.common.repository.board.BoardCategoryRepository;
import net.linkednest.common.repository.board.BoardRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardCategoryRepository boardCategoryRepository;
    private final BoardRepository boardRepository;
    private final BoardArticleRepository boardArticleRepository;
    private final BoardArticleService boardArticleService;

    public ResBoardDto getBoardDetail(String boardCode) {
        Optional<Board> boardOptional = this.boardRepository.findByBoardCode(boardCode);
        if (boardOptional.isPresent()) {
            Board boardObj = boardOptional.get();
            ResBoardDto resBoardObj = new ResBoardDto();
            resBoardObj.setBoardKeyword(boardObj.getBoardKeyword());
            resBoardObj.setBoardCode(boardObj.getBoardCode());
            resBoardObj.setBoardName(boardObj.getBoardName());
            resBoardObj.setBoardCategoryId(boardObj.getBoardCategory().getId());
            resBoardObj.setBoardType(boardObj.getBoardType());
            resBoardObj.setId(boardObj.getId());
            return resBoardObj;
        }
        return null;
    }


}
