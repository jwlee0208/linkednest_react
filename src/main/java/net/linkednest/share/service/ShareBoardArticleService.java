package net.linkednest.share.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.security.CustomUserDetails;
import net.linkednest.common.utils.CommonUtil;
import net.linkednest.share.dto.ReqShareBoardArticleDto;
import net.linkednest.share.dto.ReqShareBoardArticleListDto;
import net.linkednest.share.entity.ShareBoard;
import net.linkednest.share.entity.ShareBoardArticle;
import net.linkednest.share.entity.ShareBoardCategory;
import net.linkednest.share.repository.ShareBoardArticleRepository;
import net.linkednest.share.repository.ShareBoardCategoryRepository;
import net.linkednest.share.repository.ShareBoardRepository;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.coyote.Response;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShareBoardArticleService {
    private final ShareBoardRepository          shareBoardRepository;
    private final ShareBoardCategoryRepository  shareBoardCategoryRepository;
    private final ShareBoardArticleRepository   shareBoardArticleRepository;

    public Page<ShareBoardArticle> getShareBoardArticleList(ReqShareBoardArticleListDto reqShareBoardArticleListDto, User user) {
        int offset                  = reqShareBoardArticleListDto.getOffset();
        int limit                   = reqShareBoardArticleListDto.getLimit();
        Long shareBoardCategoryId   = reqShareBoardArticleListDto.getShareBoardCategoryId();
        Long shareBoardId           = reqShareBoardArticleListDto.getShareBoardId();

        if (limit == 0) limit = 10;
        Pageable pageable = PageRequest.of((int) Math.floor(offset/limit), limit, Sort.by(Sort.Direction.DESC, "createDate"));

        log.info("[{}.{}] reqShareBoardArticleListDto  : {}", this.getClass().getName(), "getShareBoardArticleList", reqShareBoardArticleListDto.toString());
        Page<ShareBoardArticle> shareBoardArticlePage = null;
        if (shareBoardId > 0) {
            Optional<ShareBoard> shareBoardOptional = shareBoardRepository.findById(shareBoardId);
            log.info("[{}.{}] shareBoardOptional  : {}", this.getClass().getName(), "getShareBoardArticleList", shareBoardOptional.isPresent());
            if (shareBoardOptional.isPresent()){
                shareBoardArticlePage = shareBoardArticleRepository.findAllByShareBoardAndCreateUserAndStatus(shareBoardOptional.get(), user, 1, pageable);
            }
        } else if (shareBoardCategoryId > 0) {
            Optional<ShareBoardCategory> shareBoardCategoryOptional = shareBoardCategoryRepository.findById(shareBoardCategoryId);
            log.info("[{}.{}] shareBoardCategoryOptional  : {}", this.getClass().getName(), "getShareBoardArticleList", shareBoardCategoryOptional.isPresent());
            if (shareBoardCategoryOptional.isPresent()){
                shareBoardArticlePage = shareBoardArticleRepository.findAllByShareBoardCategoryAndCreateUserAndStatus(shareBoardCategoryOptional.get(), user, 1, pageable);
            }
        } else {
            shareBoardArticlePage = shareBoardArticleRepository.findAllByCreateUserAndStatus(user, 1, pageable);
        }

        return shareBoardArticlePage;
    }

    public ShareBoardArticle getShareBoardArticleDetail(Long shareBoardArticleId) {
        Optional<ShareBoardArticle> shareBoardArticleOptional = this.shareBoardArticleRepository.findById(shareBoardArticleId);
        if  (shareBoardArticleOptional.isPresent()) {
            return shareBoardArticleOptional.get();
        }
        return null;
    }

    public CommonResDto registShareBoardArticle(ReqShareBoardArticleDto reqShareBoardArticleDto)  {

        CommonResDto commonResDto = new CommonResDto();
        commonResDto.setReturnCode(10000);
        commonResDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());

        ShareBoard shareBoard = new ShareBoard();
        ShareBoardArticle shareBoardArticle = new ShareBoardArticle();
        if (reqShareBoardArticleDto.getId() != null && reqShareBoardArticleDto.getId() != 0L) {
            Optional<ShareBoardArticle> shareBoardArticleOptional = shareBoardArticleRepository.findById(reqShareBoardArticleDto.getId());
            if (shareBoardArticleOptional.isPresent()) {
                shareBoardArticle = shareBoardArticleOptional.get();
            } else {
                commonResDto.setReturnCode(50000);
                commonResDto.setReturnMsg(ResponseCodeMsg.of(50000).getResMsg());
            }
        }

        if (commonResDto.getReturnCode() == 10000) {
            Long shareBoardId = reqShareBoardArticleDto.getShareBoardId();
            if (shareBoardId != null && shareBoardId != 0L) {
                Optional<ShareBoard> shareBoardOptional = shareBoardRepository.findById(shareBoardId);
                if (shareBoardOptional.isPresent()) {
                    shareBoard = shareBoardOptional.get();
                    shareBoardArticle.setShareBoard(shareBoard);
                    shareBoardArticle.setShareBoardCategory(shareBoard.getShareBoardCategory());
                } else {
                    commonResDto.setReturnCode(40000);
                    commonResDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
                }
            } else {
                commonResDto.setReturnCode(40000);
                commonResDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
            }
        }

        if (commonResDto.getReturnCode() == 10000) {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            CustomUserDetails userDetails = (CustomUserDetails)principal;
            if (ObjectUtils.isNotEmpty(userDetails)) {
                if (shareBoardArticle.getId() != null && shareBoardArticle.getId() != 0L){
                    shareBoardArticle.setModifyDate(new Date());
                    shareBoardArticle.setModifyUser(userDetails.getUser());
                } else {
                    shareBoardArticle.setCreateDate(new Date());
                    shareBoardArticle.setCreateUser(userDetails.getUser());
                }
                String contentHtml = HtmlUtils.htmlUnescape(reqShareBoardArticleDto.getContent());

                shareBoardArticle.setStatus(1);
                shareBoardArticle.setTitle(reqShareBoardArticleDto.getTitle());
                shareBoardArticle.setContent(contentHtml);
                shareBoardArticle.setContentText(CommonUtil.removeTag(contentHtml));
                shareBoardArticle.setFilePath(StringUtils.defaultString(reqShareBoardArticleDto.getFilePath()));
                shareBoardArticle.setOriginalFileName(StringUtils.defaultString(reqShareBoardArticleDto.getOriginalFilePath()));

                ShareBoardArticle registedArticle = shareBoardArticleRepository.saveAndFlush(shareBoardArticle);
                if (ObjectUtils.isEmpty(registedArticle)) {
                    commonResDto.setReturnCode(50000);
                    commonResDto.setReturnMsg(ResponseCodeMsg.of(50000).getResMsg());
                }
            } else {
                commonResDto.setReturnCode(20002);
                commonResDto.setReturnMsg(ResponseCodeMsg.of(20002).getResMsg());
            }
        }
        return commonResDto;
    }
}
