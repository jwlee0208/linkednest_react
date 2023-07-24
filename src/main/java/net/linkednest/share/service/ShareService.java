package net.linkednest.share.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.security.JwtProvider;
import net.linkednest.share.dto.ReqShareDto;
import net.linkednest.share.dto.ResShareDto;
import net.linkednest.share.entity.Share;
import net.linkednest.share.repository.ShareRepository;
import net.linkednest.www.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class ShareService {
    private final ShareRepository shareRepository;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    public ResShareDto getShare(Long userNo) {
        ResShareDto resShareDto = new ResShareDto();
        Optional<User> userOptional = userService.getUserByUserNo(userNo);
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
            } else {
                resShareDto.setReturnCode(40000);
                resShareDto.setReturnMsg(ResponseCodeMsg.of(40000).getResMsg());
            }
        }
        return resShareDto;
    }

    public CommonResDto modifyShare(ReqShareDto reqShareDto) {
        CommonResDto commonResDto = new CommonResDto();
        Optional<User> userOptional = userService.getUserByUserNo(reqShareDto.getUserNo());
        if (userOptional.isPresent()) {
            Share share = new Share();
            Optional<Share> shareOptional = this.shareRepository.findByUser(userOptional.get());
            if (shareOptional.isPresent()) {
                share = shareOptional.get();
            }
            share.setShareType(reqShareDto.getShareType());
            share.setShareName(reqShareDto.getShareName());
            share.setUser(userOptional.get());
            share.setIntroduce(reqShareDto.getIntroduce());
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
        }
        return commonResDto;
    }

    public boolean isUserValid(HttpServletRequest request, Long userNo) {
        String accessToken = jwtProvider.resolveToken(request);
        if (StringUtils.isNotEmpty(accessToken)) {
            String tokenUserId = jwtProvider.getUserId(accessToken);
            if (StringUtils.isNotEmpty(tokenUserId)) {
                Optional<User> optionalUser = userService.getUser(tokenUserId);
                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    if (user.getUserNo() == userNo) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
