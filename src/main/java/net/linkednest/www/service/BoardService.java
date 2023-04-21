package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.board.ReqBoardArticleListDto;
import net.linkednest.common.entity.board.Board;
import net.linkednest.common.entity.board.BoardArticle;
import net.linkednest.common.entity.board.BoardCategory;
import net.linkednest.common.repository.board.BoardArticleRepository;
import net.linkednest.common.repository.board.BoardCategoryRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardCategoryRepository boardCategoryRepository;
    private final BoardArticleRepository boardArticleRepository;

    public List getBoardArticleList(ReqBoardArticleListDto reqBoardArticleListObj) {
        String contentCode          = StringUtils.defaultString(reqBoardArticleListObj.getContentCode());
        String boardCategoryKeyword = StringUtils.defaultString(reqBoardArticleListObj.getBoardCategoryKeyword());
        String boardKeyword         = StringUtils.defaultString(reqBoardArticleListObj.getBoardKeyword());

        List<BoardArticle>      boardArticleList        = new ArrayList<>();
        Optional<BoardCategory> boardCategoryOptional   = boardCategoryRepository.findByBoardCategoryCode(String.format("%s_%s", contentCode, boardCategoryKeyword));
        if (boardCategoryOptional.isPresent()) {
            BoardCategory   boardCategory = boardCategoryOptional.get();
            Optional<Board> boardOptional = boardCategory.getBoardList().stream().filter(board -> StringUtils.equals(boardKeyword, board.getBoardKeyword())).findFirst();
            if (boardOptional.isPresent()) {
                Board board      = boardOptional.get();
                boardArticleList = boardArticleRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createDate"));
            }
        }
        return boardArticleList;
    }
}
