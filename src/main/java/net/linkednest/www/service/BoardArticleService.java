package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.dto.board.ReqBoardArticleDto;
import net.linkednest.common.dto.board.ReqBoardArticleListDto;
import net.linkednest.common.dto.board.ResBoardArticleDto;
import net.linkednest.common.dto.board.ResBoardDto;
import net.linkednest.common.entity.board.Board;
import net.linkednest.common.entity.board.BoardArticle;
import net.linkednest.common.entity.board.BoardCategory;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.repository.board.BoardArticleRepository;
import net.linkednest.common.repository.board.BoardCategoryRepository;
import net.linkednest.common.repository.board.BoardRepository;
import net.linkednest.common.repository.user.UserRepository;
import net.linkednest.common.security.CustomUserDetails;
import net.linkednest.common.utils.CommonUtil;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardArticleService {
    private final BoardArticleRepository boardArticleRepository;
    private final BoardCategoryRepository boardCategoryRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");   // yyyy-MM-dd HH:mm:ss

    public List<ResBoardArticleDto> getBoardArticleList(ReqBoardArticleListDto reqBoardArticleListObj) {
        String methodName = new Object(){}.getClass().getEnclosingMethod().getName();
        log.info("[{}.{}] reqBoardArticleListObj : {}", this.getClass().getName().toString(), methodName, reqBoardArticleListObj);



        String contentCode          = StringUtils.defaultString(reqBoardArticleListObj.getContentCode());
        String boardCategoryKeyword = StringUtils.defaultString(reqBoardArticleListObj.getBoardCategoryKeyword());
        String boardKeyword         = StringUtils.defaultString(reqBoardArticleListObj.getBoardKeyword());
        int offset                  = reqBoardArticleListObj.getOffset();
        int limit                   = reqBoardArticleListObj.getLimit();
        if (limit == 0) limit = 10;
        log.info("[{}.{}] offset : {}, limit : {}", this.getClass().getName(), methodName, offset, limit);

        List<BoardArticle>      boardArticleList        = new ArrayList<>();
        List<ResBoardArticleDto> resBoardArticleList    = new ArrayList<>();
        Optional<BoardCategory> boardCategoryOptional   = boardCategoryRepository.findByBoardCategoryCode(String.format("%s_%s", contentCode, boardCategoryKeyword));
        if (boardCategoryOptional.isPresent()) {
            BoardCategory   boardCategory = boardCategoryOptional.get();
            Optional<Board> boardOptional = boardCategory.getBoardList().stream().filter(board -> StringUtils.equals(boardKeyword, board.getBoardKeyword())).findFirst();
            if (boardOptional.isPresent()) {
                Board board      = boardOptional.get();

                log.info("[{}.{}] board : {}", this.getClass().getName(), "getBoardArticleList", board.getId());

                Pageable pageable = PageRequest.of((int) Math.floor(offset/limit), limit, Sort.by(Sort.Direction.DESC, "createDate"));
                boardArticleList = boardArticleRepository.findAllByBoard(board, pageable);

                log.info("[{}.{}] boardArticleList : {}", this.getClass().getName(), "getBoardArticleList", boardArticleList);


//                boardArticleList = boardArticleRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createDate"));
                if (!CollectionUtils.isEmpty(boardArticleList)) {
                    for(BoardArticle boardArticle : boardArticleList) {
                        resBoardArticleList.add(this.getBoardArticle(boardArticle));
                    }
                }
            }
        }
        return resBoardArticleList;
    }

    public List<ResBoardDto> getBoardArticleList(String contentCode, String boardCategoryKeyword, int offset, int limit) {
        List<ResBoardDto> resBoardList = new ArrayList<>();
        String boardCategoryCode = String.format("%s_%s", contentCode, boardCategoryKeyword);
        Optional<BoardCategory> boardCategoryOptional = boardCategoryRepository.findByBoardCategoryCode(boardCategoryCode);
        if (boardCategoryOptional.isPresent()) {
            BoardCategory boardCategoryObj = boardCategoryOptional.get();

            List<Board> boardList = boardRepository.findAllByBoardCategory(boardCategoryObj);
            if (!CollectionUtils.isEmpty(boardList)) {
                for(Board boardObj : boardList) {
                    ResBoardDto resBoardObj = new ResBoardDto();
                    resBoardObj.setBoardCategoryId(boardObj.getBoardCategory().getId());
                    resBoardObj.setBoardName(boardObj.getBoardName());
                    resBoardObj.setBoardCode(boardObj.getBoardCode());
                    resBoardObj.setBoardType(boardObj.getBoardType());
                    resBoardObj.setBoardKeyword(boardObj.getBoardKeyword());
                    resBoardObj.setId(boardObj.getId());
                    resBoardObj.setImgPath(boardObj.getImagePath());

                    List<ResBoardArticleDto> resBoardArticleList = new ArrayList<>();

                    Pageable pageable = PageRequest.of(offset, limit, Sort.Direction.DESC, "createDate");
                    List<BoardArticle> boardArticleList = boardArticleRepository.findAllByBoard(boardObj, pageable);

                    if (!CollectionUtils.isEmpty(boardArticleList)) {
                        for(BoardArticle boardArticleObj : boardArticleList) {
                            resBoardArticleList.add(this.getBoardArticle(boardArticleObj));
                        }
                        resBoardObj.setBoardArticleList(resBoardArticleList);
                    }
                    resBoardList.add(resBoardObj);
                }
            }

        }
        return resBoardList;
    }

    public CommonResDto editBoardArticle(ReqBoardArticleDto reqBoardArticleObj) {
        int returnCode = 10000;
        CommonResDto resObj = new CommonResDto();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        CustomUserDetails userDetails = (CustomUserDetails)principal;
        Long boardArticleId = reqBoardArticleObj.getId();
        Optional<Board> boardOptional = boardRepository.findById(reqBoardArticleObj.getBoardId());
        if (boardOptional.isPresent() && ObjectUtils.isNotEmpty(userDetails)) {
            User user = userDetails.getUser();
            Board boardObj = boardOptional.get();
            BoardArticle boardArticle = null;
            if (boardArticleId > 0L) {
                Optional<BoardArticle> boardArticleOptional = boardArticleRepository.findById(boardArticleId);
                if (boardArticleOptional.isPresent()) {
                    boardArticle = boardArticleOptional.get();
                }
            }
            else boardArticle = new BoardArticle();

            String contentStr = StringUtils.defaultString(reqBoardArticleObj.getContent());

            boardArticle.setBoard(boardObj);
            boardArticle.setContent(contentStr);
            boardArticle.setContentText(CommonUtil.removeTag(contentStr));
            boardArticle.setTitle(reqBoardArticleObj.getTitle());
            boardArticle.setImagePath(StringUtils.defaultString(reqBoardArticleObj.getImagePath()));
            boardArticle.setIsActive(true);

            if (boardArticleId > 0L) {
                // update
                boardArticle.setId(reqBoardArticleObj.getId());
                boardArticle.setUpdateUser(user);
                boardArticle.setUpdateDate(new Date());
            } else {
                // create
                boardArticle.setCreateUser(user);
                boardArticle.setCreateDate(new Date());
            }

            BoardArticle savedObj = this.boardArticleRepository.saveAndFlush(boardArticle);

            if (ObjectUtils.isEmpty(savedObj)) {
                returnCode = 50000;
            }
        } else {
            // board is not exist
            returnCode = 50000;
        }

        resObj.setReturnCode(returnCode);
        resObj.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());

        return resObj;
    }

    public ResBoardArticleDto getBoardArticle(BoardArticle boardArticle) {
        ResBoardArticleDto resBoardArticleObj = new ResBoardArticleDto();
        resBoardArticleObj.setId(boardArticle.getId());
        resBoardArticleObj.setBoardId(boardArticle.getBoard().getId());
        resBoardArticleObj.setContent(boardArticle.getContent());
        resBoardArticleObj.setContentText(boardArticle.getContentText());
        resBoardArticleObj.setImagePath(boardArticle.getImagePath());
        resBoardArticleObj.setTitle(boardArticle.getTitle());
        resBoardArticleObj.setIsActive(boardArticle.getIsActive());
        if (ObjectUtils.isNotEmpty(boardArticle.getCreateDate())) {
            resBoardArticleObj.setCreateDate(formatter.format(boardArticle.getCreateDate()));
        }
        if (ObjectUtils.isNotEmpty(boardArticle.getUpdateDate())) {
            resBoardArticleObj.setUpdateDate(formatter.format(boardArticle.getUpdateDate()));
        }
        resBoardArticleObj.setCreateUserNo(boardArticle.getCreateUser().getUserNo());
        resBoardArticleObj.setCreateUserId(boardArticle.getCreateUser().getUserId());
        return resBoardArticleObj;
    }
}
