package net.linkednest.www.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.entity.user.UserProfile;
import net.linkednest.common.dto.user.signup.ReqUserRegistDto;
import net.linkednest.common.repository.user.UserProfileRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;

    public void saveUserProfile(ReqUserRegistDto reqUserRegistDto, User user) {

        UserProfile userProfile = new UserProfile();
        userProfile.setUser(user);
        userProfile.setCreateUser(user);
        userProfile.setSex(StringUtils.defaultString(reqUserRegistDto.getSex()));
        userProfile.setBirthday(StringUtils.defaultString(reqUserRegistDto.getBirthday()));
        userProfile.setPhoneNo(StringUtils.defaultString(reqUserRegistDto.getPhoneNo()));

        try {
            userProfileRepository.save(userProfile);
        } catch (Exception e) {

            log.error("[{}.{}] userProfileService.saveUserProfile ERROR OCCURRED reqDto : {}, errorMsg : {}", this.getClass().getName(), "saveUserProfile", reqUserRegistDto.toString(), e.getMessage());
            e.printStackTrace();
        }
    }
}
