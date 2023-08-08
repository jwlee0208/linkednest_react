package net.linkednest.share.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.service.UserService;
import net.linkednest.share.dto.ReqShareBoardArticleListDto;
import net.linkednest.share.dto.ResShareBoardArticleDto;
import net.linkednest.share.dto.ResShareBoardArticleListDto;
import net.linkednest.share.entity.ShareBoardArticle;
import net.linkednest.share.service.ShareBoardArticleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping(value = "/api/share/board/article")
@RequiredArgsConstructor
public class ShareBoardArticleController {
    private final ShareBoardArticleService shareBoardArticleService;
    private final UserService userService;

    @RequestMapping(value = {"", "/"}, method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity getShareBoardArticleMain() {
        return ResponseEntity.ok("");
    }

    @RequestMapping(value = "/list", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity getShareBoardArticleListByUser(ReqShareBoardArticleListDto reqShareBoardArticleListDto) {
        ResShareBoardArticleListDto resShareBoardArticleListDto = new ResShareBoardArticleListDto();
        Optional<User> userOptional = userService.findByUserId(reqShareBoardArticleListDto.getShareUserId());
        if (userOptional.isPresent()) {
            Page<ShareBoardArticle> shareBoardArticlePage = this.shareBoardArticleService.getShareBoardArticleList(reqShareBoardArticleListDto, userOptional.get());
            if (shareBoardArticlePage.hasContent()) {
                List<ResShareBoardArticleDto> resShareBoardArticleDtoList = new ArrayList<>();
                for(ShareBoardArticle shareBoardArticle : shareBoardArticlePage.getContent()) {
//                    log.info("[{}.{}] shareBoardArticlePage content : {}", this.getClass().getName(), "getShareBoardArticleListByUser", shareBoardArticle.toString());
                    ResShareBoardArticleDto resShareBoardArticleDto = new ResShareBoardArticleDto();
                    resShareBoardArticleDto.setShareBoard(shareBoardArticle.getShareBoard());
                    resShareBoardArticleDto.setId(shareBoardArticle.getId());
//                    resShareBoardArticleDto.setShareBoardCategory(shareBoardArticle.getShareBoardCategory());
                    resShareBoardArticleDto.setCreateUser(shareBoardArticle.getCreateUser());
                    resShareBoardArticleDto.setTitle(shareBoardArticle.getTitle());
                    resShareBoardArticleDto.setContent(shareBoardArticle.getContent());
                    resShareBoardArticleDto.setStatus(shareBoardArticle.getStatus());
                    resShareBoardArticleDto.setCreateDate(shareBoardArticle.getCreateDate());
                    resShareBoardArticleDto.setFilePath(shareBoardArticle.getFilePath());
                    resShareBoardArticleDto.setOriginalFileName(shareBoardArticle.getOriginalFileName());
                    resShareBoardArticleDtoList.add(resShareBoardArticleDto);
                }
                resShareBoardArticleListDto.setShareBoardArticleList(resShareBoardArticleDtoList);
                resShareBoardArticleListDto.setTotalPages(shareBoardArticlePage.getTotalPages());
                resShareBoardArticleListDto.setReturnCode(10000);
                resShareBoardArticleListDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
            } else {
                resShareBoardArticleListDto.setReturnCode(40000);
                resShareBoardArticleListDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
            }
        } else {
            resShareBoardArticleListDto.setReturnCode(20002);
            resShareBoardArticleListDto.setReturnMsg(ResponseCodeMsg.of(20002).getResMsg());
        }
        return ResponseEntity.ok(resShareBoardArticleListDto);
    }


}
