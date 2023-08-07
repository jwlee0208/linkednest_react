package net.linkednest.share.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.user.User;
import net.linkednest.share.dto.ReqShareBoardCategoryDto;
import net.linkednest.share.entity.ShareBoardCategory;
import net.linkednest.share.repository.ShareBoardCategoryRepository;
import net.linkednest.common.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShareBoardCategoryService {
    private final ShareBoardCategoryRepository shareBoardCategoryRepository;
    private final UserService userService;

    public List<ShareBoardCategory> getShareBoardCategoryList(ReqShareBoardCategoryDto reqShareBoardCategoryDto) {
        String userId = reqShareBoardCategoryDto.getCreateUserId();
        log.info("[{}.{}] userId : {}", this.getClass().getName(), "getShareBoardCategoryList", userId);
        if (StringUtils.isNotEmpty(userId)) {
            Optional<User> userOptional = userService.findByUserId(userId);
            log.info("[{}.{}] userOptional : {}", this.getClass().getName(), "getShareBoardCategoryList", userOptional);
            if (userOptional.isPresent()){
                log.info("[{}.{}] userOptional.get() : {}", this.getClass().getName(), "getShareBoardCategoryList", userOptional.get());
                return shareBoardCategoryRepository.findAllByUser(userOptional.get());
            }
        }
        return null;
    }
    public ShareBoardCategory getShareBoardCategory(ReqShareBoardCategoryDto reqShareBoardCategoryDto)  {
        Long boardCategoryId = reqShareBoardCategoryDto.getBoardCategoryId();
        Optional<ShareBoardCategory> shareBoardCategoryOptional = shareBoardCategoryRepository.findById(boardCategoryId);
        if (shareBoardCategoryOptional.isPresent()) {
            return shareBoardCategoryOptional.get();
        }
        return null;
    }
    public ShareBoardCategory getSharePrevBoardCategory(ReqShareBoardCategoryDto reqShareBoardCategoryDto)  {
        Long boardCategoryId = reqShareBoardCategoryDto.getBoardCategoryId();
        Pageable pageable = PageRequest.of(0, 1, Sort.Direction.DESC, "id");
        Page<ShareBoardCategory> shareBoardCategoryPage = shareBoardCategoryRepository.findByIdLessThan(boardCategoryId, pageable);
        if (!shareBoardCategoryPage.isEmpty()) {
            return shareBoardCategoryPage.getContent().get(0);
        }
        return null;
    }
    public ShareBoardCategory getShareNextBoardCategory(ReqShareBoardCategoryDto reqShareBoardCategoryDto)  {
        Long boardCategoryId = reqShareBoardCategoryDto.getBoardCategoryId();
        Pageable pageable = PageRequest.of(0, 1, Sort.Direction.ASC, "id");

        Page<ShareBoardCategory> shareBoardCategoryPage = shareBoardCategoryRepository.findByIdGreaterThan(boardCategoryId, pageable);
        if (!shareBoardCategoryPage.isEmpty()) {
            return shareBoardCategoryPage.getContent().get(0);
        }
        return null;
    }

}
