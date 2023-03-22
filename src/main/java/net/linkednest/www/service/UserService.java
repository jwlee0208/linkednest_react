package net.linkednest.www.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.CommonConstants;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.www.dto.user.ResTokenDto;
import net.linkednest.www.dto.user.signin.ReqUserLoginDto;
import net.linkednest.www.dto.user.signin.ResUserLoginDto;
import net.linkednest.www.dto.user.signup.ReqUserRegistDto;
import net.linkednest.common.entity.Authority;
import net.linkednest.common.entity.User;
import net.linkednest.common.entity.UserRefreshToken;
import net.linkednest.www.repository.UserRefreshTokenRepository;
import net.linkednest.www.repository.UserRepository;
import net.linkednest.common.security.JwtProvider;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public Boolean registUser(ReqUserRegistDto userRegistDto) {
        log.info("[{}.{}] userRegist : {}", this.getClass().getName().toString(), "registUser", userRegistDto.toString());
        User newUser = new User();

        try {
            newUser.setUserId(new String(Base64.getDecoder().decode(userRegistDto.getUsername())));
            newUser.setEmail(userRegistDto.getEmail());
            newUser.setNickname(userRegistDto.getNickname());
            newUser.setPassword(passwordEncoder.encode(new String(Base64.getDecoder().decode(userRegistDto.getPassword()))));
            newUser.setIntroduce(StringUtils.defaultString(userRegistDto.getIntroduce()));
            Authority authority = new Authority();
            authority.setName("ROLE_USER");

            newUser.setRoles(Collections.singletonList(authority));

            log.info("[{}.{}] userRegist >> decoded : {}", this.getClass().getName().toString(), "registUser", newUser.toString());

            userRepository.save(newUser);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public Boolean updateUser(ReqUserRegistDto userRegistDto) {
        log.info("[{}.{}] updateUser : {}", this.getClass().getName(), "updateUser", userRegistDto.toString());
        User newUser = new User();
        String decodedUserId = new String(Base64.getDecoder().decode(userRegistDto.getUsername()));
        try {
            Optional<User> userOptional = this.getUser(decodedUserId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setUserId(decodedUserId);
                user.setEmail(userRegistDto.getEmail());
                user.setNickname(userRegistDto.getNickname());
                user.setIntroduce(StringUtils.defaultString(userRegistDto.getIntroduce()));

                log.info("[{}.{}] before update user : {}", this.getClass().getName(), "updateUser", user);

                userRepository.save(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
    public ResUserLoginDto login(ReqUserLoginDto reqUserLoginDto, HttpServletResponse response) {

        ResUserLoginDto resUserLoginDto = new ResUserLoginDto();

        String userId = new String(Base64.getDecoder().decode(reqUserLoginDto.getUsername()));
        String password = new String(Base64.getDecoder().decode(reqUserLoginDto.getPassword()));

        Optional<User> userOptional = this.getUser(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
//            String encryptPw = passwordEncoder.encode(password);
            Boolean isMatchedPw = passwordEncoder.matches(password, user.getPassword());
            if (isMatchedPw) {
                resUserLoginDto.setReturnCode(10000);
                resUserLoginDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
                resUserLoginDto.setIsLogin(true);
                resUserLoginDto.setUsername(user.getUserId());
                resUserLoginDto.setAccessToken(jwtProvider.createToken(user.getUserId(), user.getRoles()));
                resUserLoginDto.setEmail(user.getEmail());
                resUserLoginDto.setIntroduce(user.getIntroduce());
                resUserLoginDto.setNickname(user.getNickname());
                Optional<UserRefreshToken> refreshTokenOptional = userRefreshTokenRepository.findByUser(user);
                String mergeRefreshTokenVal = null;
                UserRefreshToken refreshTokenObj = null;
                UserRefreshToken mergedRefreshToken = null;
                if (!refreshTokenOptional.isPresent()) {
                    mergeRefreshTokenVal = jwtProvider.createToken(user.getUserId(), user.getRoles());
                    refreshTokenObj = new UserRefreshToken();
                    refreshTokenObj.setUser(user);
                    refreshTokenObj.setRefreshToken(mergeRefreshTokenVal);
                    mergedRefreshToken = userRefreshTokenRepository.save(refreshTokenObj);
                } else {
                    mergedRefreshToken = refreshTokenOptional.get();
                }
                response.setHeader(CommonConstants.REFRESH_TOKEN, mergedRefreshToken.getRefreshToken());
            } else {
                resUserLoginDto.setReturnCode(20001);
                resUserLoginDto.setReturnMsg(ResponseCodeMsg.of(20001).getResMsg());
                resUserLoginDto.setIsLogin(false);
            }
        } else {
            resUserLoginDto.setReturnCode(20002);
            resUserLoginDto.setReturnMsg(ResponseCodeMsg.of(20002).getResMsg());
            resUserLoginDto.setIsLogin(false);
        }
        return resUserLoginDto;
    }

    public Optional<User> getUser(String userId) {
        return userRepository.findByUserId(userId);
    }

    public ResTokenDto reIssueToken(String refreshToken) {

        ResTokenDto resTokenDto = new ResTokenDto();
        Optional<UserRefreshToken> userRefreshTokenOptional = userRefreshTokenRepository.findByRefreshToken(refreshToken);
        if (userRefreshTokenOptional.isPresent()) {
            UserRefreshToken userRefreshToken = userRefreshTokenOptional.get();
            resTokenDto.setAccessToken(jwtProvider.createToken(userRefreshToken.getUser().getUserId(), userRefreshToken.getUser().getRoles()));
            resTokenDto.setRefreshToken(refreshToken);
        }
        resTokenDto.setReturnCode(userRefreshTokenOptional.isPresent() ? 10000 : 50000);
        resTokenDto.setReturnMsg(userRefreshTokenOptional.isPresent() ? ResponseCodeMsg.of(10000).getResMsg() : "FAIL");
        return resTokenDto;
    }
}
