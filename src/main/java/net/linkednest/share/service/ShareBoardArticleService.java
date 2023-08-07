package net.linkednest.share.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.user.User;
import net.linkednest.share.dto.ReqShareBoardArticleListDto;
import net.linkednest.share.entity.ShareBoardArticle;
import net.linkednest.share.repository.ShareBoardArticleRepository;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShareBoardArticleService {
    private final ShareBoardArticleRepository shareBoardArticleRepository;

    public Page<ShareBoardArticle> getShareBoardArticleList(ReqShareBoardArticleListDto reqShareBoardArticleListDto, User user) {
        int offset                  = reqShareBoardArticleListDto.getOffset();
        int limit                   = reqShareBoardArticleListDto.getLimit();
        if (limit == 0) limit = 10;
        Pageable pageable = PageRequest.of((int) Math.floor(offset/limit), limit, Sort.by(Sort.Direction.DESC, "createDate"));
        return shareBoardArticleRepository.findAllByCreateUser(user, pageable);
    }
}
