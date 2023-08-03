package net.linkednest.share.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.security.JwtProvider;
import net.linkednest.share.dto.ReqShareDto;
import net.linkednest.share.dto.ResShareDto;
import net.linkednest.share.service.ShareService;
import net.linkednest.common.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/share")
public class ShareController {
    private JwtProvider jwtProvider;
    private final ShareService shareService;
    private final UserService userService;

    @GetMapping(value = "/{userNo}")
    public ResponseEntity getShare(HttpServletRequest request, @PathVariable Long userNo) {
        // to-do : token의 user 정보와 파라미터 유저 정보의 비교
        boolean isUserValid = this.shareService.isUserValid(request, userNo);
        ResShareDto resShareDto= new ResShareDto();
        if  (isUserValid) {
            resShareDto = this.shareService.getShare(userNo);
        }  else {
            resShareDto.setReturnCode(20005);
            resShareDto.setReturnMsg(ResponseCodeMsg.of(20005).getResMsg());
        }
        return ResponseEntity.ok(resShareDto);
    }

    @PostMapping(value = "/{userNo}")
    public ResponseEntity createShare(HttpServletRequest request, ReqShareDto reqShareDto) {
        return this.mergeShare(request, reqShareDto);

    }

    @PatchMapping(value = "/{userNo}")
    public ResponseEntity updateShare(HttpServletRequest request, ReqShareDto reqShareDto) {
        return this.mergeShare(request, reqShareDto);
    }

    private ResponseEntity mergeShare(HttpServletRequest request, ReqShareDto reqShareDto) {
        boolean isUserValid = this.shareService.isUserValid(request, reqShareDto.getUserNo());
        CommonResDto commonResDto = new CommonResDto();
        if (isUserValid) {
            Optional<User> userOptional = userService.findByUserId(jwtProvider.getUserId(request));
            if (userOptional.isPresent()) {
                commonResDto = this.shareService.mergeShare(userOptional.get());
            } else {
                commonResDto.setReturnCode(20002);
                commonResDto.setReturnMsg(ResponseCodeMsg.of(20002).getResMsg());
            }
        } else {
            commonResDto.setReturnCode(20005);
            commonResDto.setReturnMsg(ResponseCodeMsg.of(20005).getResMsg());
        }
        return ResponseEntity.ok(commonResDto);
    }

}
