package net.linkednest.share.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.repository.user.UserRepository;
import net.linkednest.common.security.JwtProvider;
import net.linkednest.share.dto.ResShareDto;
import net.linkednest.share.entity.Share;
import net.linkednest.share.repository.ShareRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class ShareService {
    private final ShareRepository shareRepository;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public ResShareDto getShare(String userId) {
        ResShareDto resShareDto = new ResShareDto();
        Optional<User> userOptional = userRepository.findByUserId(userId);
        if (userOptional.isPresent()) {
            Optional<Share> optionalShare = shareRepository.findByUser(userOptional.get());
            if (optionalShare.isPresent()){
                resShareDto.setReturnCode(10000);
                resShareDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
                resShareDto.setId(optionalShare.get().getId());
                resShareDto.setShareName(optionalShare.get().getShareName());
                resShareDto.setShareType(optionalShare.get().getShareType());
                resShareDto.setUserNo(optionalShare.get().getUser().getUserNo());
                resShareDto.setCreateDate(optionalShare.get().getCreateDate());
                resShareDto.setShareBoardCategoryList(optionalShare.get().getShareBoardCategoryList());
            } else {
                resShareDto.setReturnCode(40000);
                resShareDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
            }
        }
        return resShareDto;
    }

    public CommonResDto mergeShare(User user) {
        CommonResDto commonResDto = new CommonResDto();
        Share share = new Share();
        Optional<Share> shareOptional = this.shareRepository.findByUser(user);
        if (shareOptional.isPresent()) {
            share = shareOptional.get();
        }
        share.setShareType("1");
        share.setShareName(String.format("%s's Share", user.getNickname()));
        share.setUser(user);
        share.setIntroduce(user.getIntroduce());
        share.setCreateDate(new Date());

        try {
            shareRepository.save(share);
            commonResDto.setReturnCode(10000);
            commonResDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
        } catch (Exception e) {
            e.printStackTrace();
            commonResDto.setReturnCode(50000);
            commonResDto.setReturnMsg(ResponseCodeMsg.of(50000).getResMsg());
            log.error("[{}.{}] error : {}", this.getClass().getName(), "modifyShare", e.getMessage());
        }
        return commonResDto;
    }

    public boolean isUserValid(HttpServletRequest request, Long userNo) {
        String tokenUserId = jwtProvider.getUserId(request);
        if (StringUtils.isNotEmpty(tokenUserId)) {
            Optional<User> optionalUser = userRepository.findByUserId(tokenUserId);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (user.getUserNo() == userNo) {
                    return true;
                }
            }
        }
        return false;
    }
}
