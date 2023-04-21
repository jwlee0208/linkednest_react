package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.board.ResBoardCategoryDto;
import net.linkednest.common.dto.board.ResBoardDto;
import net.linkednest.common.entity.board.Board;
import net.linkednest.common.entity.board.BoardCategory;
import net.linkednest.common.entity.content.Content;
import net.linkednest.common.repository.ContentRepository;
import net.linkednest.common.repository.board.BoardCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardCategoryService {

    private final BoardCategoryRepository boardCategoryRepository;
    private final ContentRepository contentRepository;

    public List<ResBoardCategoryDto> getContentBoardCategoryList(String contentCode) {
        List<ResBoardCategoryDto> resBoardCategoryList = new ArrayList<>();
        Optional<Content> contentOptional = contentRepository.findByContentCode(contentCode);
        if (contentOptional.isPresent()) {
            List<BoardCategory> boardCategoryList = boardCategoryRepository.findAllByContentAndIsActive(contentOptional.get(), true);
            if (!CollectionUtils.isEmpty(boardCategoryList)) {
                for(BoardCategory boardCategoryObj : boardCategoryList) {
                    ResBoardCategoryDto resBoardCategoryObj = new ResBoardCategoryDto();
                    List<Board> boardList = boardCategoryObj.getBoardList();
                    if(!CollectionUtils.isEmpty(boardList)) {
                        List<ResBoardDto> resBoardList = new ArrayList<>();
                        for(Board boardObj : boardList) {
                            ResBoardDto resBoardObj = new ResBoardDto();
                            BoardCategory boardCategory = boardObj.getBoardCategory();
                            resBoardObj.setBoardCategoryId(boardCategory.getId());
                            resBoardObj.setBoardName(boardObj.getBoardName());
                            resBoardObj.setBoardCode(boardObj.getBoardCode());
                            resBoardObj.setBoardKeyword(boardObj.getBoardKeyword());
                            resBoardObj.setId(boardObj.getId());
                            resBoardObj.setImgPath(boardObj.getImagePath());
                            resBoardList.add(resBoardObj);
                        }
                        resBoardCategoryObj.setBoardList(resBoardList);
                    }
                    Content content = boardCategoryObj.getContent();
                    resBoardCategoryObj.setContentId(content.getId());
                    resBoardCategoryObj.setContentCode(content.getContentCode());
                    resBoardCategoryObj.setBoardCategoryName(boardCategoryObj.getBoardCategoryName());
                    resBoardCategoryObj.setBoardCategoryCode(boardCategoryObj.getBoardCategoryCode());
                    resBoardCategoryObj.setBoardCategoryKeyword(boardCategoryObj.getBoardCategoryKeyword());
                    resBoardCategoryObj.setId(boardCategoryObj.getId());
                    resBoardCategoryList.add(resBoardCategoryObj);
                }
            }
        }
        return resBoardCategoryList;
    }

}
