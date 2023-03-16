package net.linkednest.www.service;

import io.netty.handler.codec.base64.Base64Decoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.www.dto.user.login.ReqUserLoginDto;
import net.linkednest.www.dto.user.login.ResUserLoginDto;
import net.linkednest.www.dto.user.regist.ReqUserRegistDto;
import net.linkednest.www.dto.user.regist.ResUserRegistDto;
import net.linkednest.www.entity.Authority;
import net.linkednest.www.entity.User;
import net.linkednest.www.repository.UserRepository;
import net.linkednest.www.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
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

    public ResUserLoginDto login(ReqUserLoginDto reqUserLoginDto) {

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
                resUserLoginDto.setReturnMsg("SUCCESS");
                resUserLoginDto.setIsLogin(true);
                resUserLoginDto.setUsername(user.getUserId());
                resUserLoginDto.setAccessToken(jwtProvider.createToken(user.getUserId(), user.getRoles()));
            } else {
                resUserLoginDto.setReturnCode(50001);
                resUserLoginDto.setReturnMsg("PASSWORD NOT MATCHED");
                resUserLoginDto.setIsLogin(false);
            }
        } else {
            resUserLoginDto.setReturnCode(50002);
            resUserLoginDto.setReturnMsg("USER NOT EXIST");
            resUserLoginDto.setIsLogin(false);
        }
        return resUserLoginDto;
    }

    public Optional<User> getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
