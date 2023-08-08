package net.linkednest.share.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.user.User;
import net.linkednest.share.dto.ReqShareBoardArticleListDto;
import net.linkednest.share.entity.ShareBoard;
import net.linkednest.share.entity.ShareBoardArticle;
import net.linkednest.share.entity.ShareBoardCategory;
import net.linkednest.share.repository.ShareBoardArticleRepository;
import net.linkednest.share.repository.ShareBoardCategoryRepository;
import net.linkednest.share.repository.ShareBoardRepository;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
