package net.linkednest.share.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.repository.user.UserRepository;
import net.linkednest.common.security.JwtProvider;
import net.linkednest.share.dto.ReqShareBoardDto;
import net.linkednest.share.dto.ResShareBoardDto;
import net.linkednest.share.entity.ShareBoard;
import net.linkednest.share.entity.ShareBoardCategory;
import net.linkednest.share.repository.ShareBoardCategoryRepository;
import net.linkednest.share.repository.ShareBoardRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShareBoardService {
    private final JwtProvider                   jwtProvider;
    private final UserRepository                userRepository;
    private final ShareBoardRepository          shareBoardRepository;
    private final ShareBoardCategoryRepository  shareBoardCategoryRepository;

    public ResShareBoardDto<ShareBoard> getShareBoardListByUser(Long userNo) {
        ResShareBoardDto<ShareBoard> resShareBoardDto = new ResShareBoardDto<>();

        Optional<User> userOptional = userRepository.findByUserNo(userNo);
        if (userOptional.isPresent()) {
            Sort sort = Sort.by("shareBoardCategory").ascending().and(Sort.by("id").ascending());
            Slice<ShareBoard> shareBoardListSlice = shareBoardRepository.findAllByCreateUser(userOptional.get(), sort);
            this.responseShareBoard(resShareBoardDto, shareBoardListSlice);
        } else {
            resShareBoardDto.setReturnCode(20002);
            resShareBoardDto.setReturnMsg(ResponseCodeMsg.of(20002).getResMsg());
        }
        return resShareBoardDto;
    }

    public ResShareBoardDto<ShareBoard> getShareBoardListBySearchCondition(HttpServletRequest request, int offset, int limit, Long id) {
        String accessTokenUserId = jwtProvider.getUserId(request);
        Optional<User> userOptional = userRepository.findByUserId(accessTokenUserId);
        ResShareBoardDto<ShareBoard> resShareBoardDto = new ResShareBoardDto<>();
        if (userOptional.isPresent()) {
            Sort sort = Sort.by("id").descending();
            Pageable pageable = PageRequest.of(offset, limit, sort);
            Slice<ShareBoard> shareBoardListSlice = shareBoardRepository.findAllByIdOrCreateUser(id, userOptional.get(), pageable);
            this.responseShareBoard(resShareBoardDto, shareBoardListSlice);
        } else {
            resShareBoardDto.setReturnCode(20002);
            resShareBoardDto.setReturnMsg(ResponseCodeMsg.of(20002).getResMsg());
        }
        return resShareBoardDto;
    }

    private void responseShareBoard(ResShareBoardDto resShareBoardDto, Slice<ShareBoard> shareBoardListSlice) {
        if (shareBoardListSlice.hasContent()) {
            resShareBoardDto.setReturnCode(10000);
            resShareBoardDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
            resShareBoardDto.setContent(shareBoardListSlice.getContent());
            resShareBoardDto.setLast(shareBoardListSlice.isLast());
            resShareBoardDto.setFirst(shareBoardListSlice.isFirst());
            resShareBoardDto.setNumber(shareBoardListSlice.getNumber());
            resShareBoardDto.setNumberOfElements(shareBoardListSlice.getNumberOfElements());
            resShareBoardDto.setSort(shareBoardListSlice.getSort());
            resShareBoardDto.setHasNext(shareBoardListSlice.hasNext());
            resShareBoardDto.setHasPrevious(shareBoardListSlice.hasPrevious());
        } else {
            resShareBoardDto.setReturnCode(40000);
            resShareBoardDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
        }
    }

    public ShareBoard getShareBoardInfo(ReqShareBoardDto reqShareBoardDto) {
        Optional<ShareBoard> shareBoardDtoOptional =  shareBoardRepository.findById(reqShareBoardDto.getId());
        if (shareBoardDtoOptional.isPresent()) {
            return shareBoardDtoOptional.get();
        }
        return null;
    }

    public ShareBoard getSharePrevBoardInfo(ReqShareBoardDto reqShareBoardDto) {
        Pageable pageable = PageRequest.of(0, 1, Sort.by(Sort.Direction.ASC, "id"));
        Page<ShareBoard> shareBoardDtoOptional =  shareBoardRepository.findByIdLessThan(reqShareBoardDto.getId(), pageable);
        if (shareBoardDtoOptional.hasContent()) {
            return shareBoardDtoOptional.getContent().get(0);
        }
        return null;
    }

    public ShareBoard getShareNextBoardInfo(ReqShareBoardDto reqShareBoardDto) {
        Pageable pageable = PageRequest.of(0, 1, Sort.by(Sort.Direction.DESC, "id"));
        Page<ShareBoard> shareBoardDtoOptional =  shareBoardRepository.findByIdGreaterThan(reqShareBoardDto.getId(), pageable);
        if (shareBoardDtoOptional.hasContent()) {
            return shareBoardDtoOptional.getContent().get(0);
        }
        return null;
    }

    public ShareBoard mergeShareBoard(HttpServletRequest request, ReqShareBoardDto reqShareBoardDto) {
        String accessToken = jwtProvider.resolveToken(request);
        if (StringUtils.isNotEmpty(accessToken)) {
            String accessTokenUserId = jwtProvider.getUserId(accessToken);
            if (StringUtils.isNotEmpty(accessTokenUserId)) {
                Optional<User> userOptional = userRepository.findByUserId(accessTokenUserId);
                if (userOptional.isPresent()) {
                    Long shareBoardCategoryId = reqShareBoardDto.getShareBoardCategoryId();
                    Optional<ShareBoardCategory> shareBoardCategoryOptional = shareBoardCategoryRepository.findById(shareBoardCategoryId);
                    if (shareBoardCategoryOptional.isPresent()) {
                        ShareBoard shareBoard = new ShareBoard();
                        Optional<ShareBoard> shareBoardOptional = shareBoardRepository.findById(reqShareBoardDto.getId());
                        if (shareBoardOptional.isPresent()) {
                            shareBoard = shareBoardOptional.get();
                            shareBoard.setModifyUser(userOptional.get());
                            shareBoard.setModifyDate(new Date());
                        } else {
                            shareBoard.setCreateUser(userOptional.get());
                            shareBoard.setCreateDate(new Date());
                        }
                        shareBoard.setBoardName(StringUtils.defaultString(reqShareBoardDto.getShareBoardName()));
                        shareBoard.setBoardType(StringUtils.defaultString(reqShareBoardDto.getShareBoardType()));
                        shareBoard.setShareBoardCategory(shareBoardCategoryOptional.get());

                        ShareBoard savedShareBoard = shareBoardRepository.saveAndFlush(shareBoard);
                        log.info("[{}.{}] savedShareBoard Result : {}", this.getClass().getName(), "mergeShareBoard",  savedShareBoard);
                        return savedShareBoard;
                    } else {
                        log.error("[{}.{}] shareBoardCategory is not existed ", this.getClass().getName(), "mergeShareBoard");
                    }
                } else {
                    log.error("[{}.{}] user info in accessToken is not existed ", this.getClass().getName(), "mergeShareBoard");
                }
            } else {
                log.error("[{}.{}] userId in accessToken is not existed ", this.getClass().getName(), "mergeShareBoard");
            }
        } else {
            log.error("[{}.{}] accessToken not existed : {}", this.getClass().getName(), "mergeShareBoard", accessToken);
        }
        return null;
    }
}
