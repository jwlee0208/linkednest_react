package net.linkednest.www.service.security;

import io.netty.handler.codec.base64.Base64Decoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.www.dto.user.regist.ReqUserRegistDto;
import net.linkednest.www.entity.Authority;
import net.linkednest.www.entity.User;
import net.linkednest.www.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Collections;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
}
