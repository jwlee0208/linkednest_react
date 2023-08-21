package net.linkednest.share.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.service.UserService;
import net.linkednest.common.utils.CommonUtil;
import net.linkednest.share.dto.ReqShareBoardArticleDto;
import net.linkednest.share.dto.ReqShareBoardArticleListDto;
import net.linkednest.share.dto.ResShareBoardArticleDto;
import net.linkednest.share.dto.ResShareBoardArticleListDto;
import net.linkednest.share.entity.ShareBoardArticle;
import net.linkednest.share.service.ShareBoardArticleService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

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

    @GetMapping(value = {"", "/"})
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
                    resShareBoardArticleDto.setCreateDate(shareBoardArticle.getCreateDate().toString());
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

    @GetMapping(value = "/{shareBoardArticleId}")
    public ResponseEntity getShareBoardArticleDetail(@PathVariable Long shareBoardArticleId) {
        ShareBoardArticle shareBoardArticle = this.shareBoardArticleService.getShareBoardArticleDetail(shareBoardArticleId);

        if(shareBoardArticle == null) {
            CommonResDto commonResDto = new CommonResDto();
            commonResDto.setReturnCode(40000);
            commonResDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
            return ResponseEntity.ok(commonResDto);
        } else {
            ResShareBoardArticleDto resShareBoardArticleDto = new ResShareBoardArticleDto();
            resShareBoardArticleDto.setId(shareBoardArticle.getId());
            resShareBoardArticleDto.setTitle(shareBoardArticle.getTitle());
            resShareBoardArticleDto.setStatus(shareBoardArticle.getStatus());
            resShareBoardArticleDto.setFilePath(shareBoardArticle.getFilePath());
            resShareBoardArticleDto.setContent(shareBoardArticle.getContent());
            resShareBoardArticleDto.setCreateUser(shareBoardArticle.getCreateUser());
            resShareBoardArticleDto.setCreateDate(shareBoardArticle.getCreateDate().toString());
            resShareBoardArticleDto.setShareBoard(shareBoardArticle.getShareBoard());
            resShareBoardArticleDto.setShareBoardCategory(shareBoardArticle.getShareBoardCategory());
            resShareBoardArticleDto.setReturnCode(10000);
            resShareBoardArticleDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
            return ResponseEntity.ok(resShareBoardArticleDto);
        }
    }

    @PostMapping(value = "")
    public ResponseEntity registShareContent(ReqShareBoardArticleDto reqShareBoardArticleDto) {
        log.info("[{}.{}] reqShareBoardArticleDto  : {}", this.getClass().getName(), "registShareContent", reqShareBoardArticleDto.toString());
        log.info("[{}.{}] HtmlUtils.htmlUnescape(reqShareBoardArticleDto.getContent())o  : {}", this.getClass().getName(), "registShareContent", HtmlUtils.htmlUnescape(reqShareBoardArticleDto.getContent()));
        log.info("[{}.{}] CommonUtil.removeTag(reqShareBoardArticleDto.getContent())  : {}", this.getClass().getName(), "registShareContent", CommonUtil.removeTag(HtmlUtils.htmlUnescape(reqShareBoardArticleDto.getContent())));

        return ResponseEntity.ok(shareBoardArticleService.registShareBoardArticle(reqShareBoardArticleDto));
    }
}
