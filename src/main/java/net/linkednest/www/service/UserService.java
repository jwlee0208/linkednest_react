package net.linkednest.www.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.CommonConstants;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.www.dto.user.ResTokenDto;
import net.linkednest.www.dto.user.role.*;
import net.linkednest.www.dto.user.signin.ReqUserLoginDto;
import net.linkednest.www.dto.user.signin.ResUserLoginDto;
import net.linkednest.www.dto.user.signup.ReqUserRegistDto;
import net.linkednest.common.entity.Authority;
import net.linkednest.common.entity.User;
import net.linkednest.common.entity.UserRefreshToken;
import net.linkednest.www.repository.RoleRepository;
import net.linkednest.www.repository.UserRefreshTokenRepository;
import net.linkednest.www.repository.UserRepository;
import net.linkednest.common.security.JwtProvider;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserProfileService userProfileService;
    private final UserRepository userRepository;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final RoleRepository roleRepository;

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
            authority.setRole(roleRepository.getById(1L));
            newUser.setRoles(Collections.singletonList(authority));

            log.info("[{}.{}] userRegist >> decoded : {}", this.getClass().getName().toString(), "registUser", newUser.toString());

            try {
                User createdUser = userRepository.saveAndFlush(newUser);

                log.info("[registUser] createdUser : {}", createdUser);

                try {
                    this.userProfileService.saveUserProfile(userRegistDto, createdUser);
                } catch (Exception e) {
                    log.error("[{}.{}] userProfileService.saveUserProfile ERROR OCCURRED reqDto : {}, errorMsg : {}", this.getClass().getName(), "registUser", userRegistDto.toString(), e.getMessage());
                    return false;
                }
            } catch (Exception e) {
                log.error("[{}.{}] userRepository.save ERROR OCCURRED entity : {}, errorMsg : {}", this.getClass().getName(), "registUser", newUser, e.getMessage());
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public Boolean updateUser(ReqUserRegistDto userRegistDto) {
        log.info("[{}.{}] updateUser : {}", this.getClass().getName(), "updateUser", userRegistDto.toString());
        String  decodedUserId   = new String(Base64.getDecoder().decode(userRegistDto.getUsername()));
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

        String userId   = new String(Base64.getDecoder().decode(reqUserLoginDto.getUsername()));
        String password = new String(Base64.getDecoder().decode(reqUserLoginDto.getPassword()));

        Optional<User> userOptional = this.getUser(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // password check
            boolean isMatchedPw = passwordEncoder.matches(password, user.getPassword());
            if (isMatchedPw) {
                resUserLoginDto.setIsLogin(true);
                resUserLoginDto.setEmail(user.getEmail());
                resUserLoginDto.setUsername(user.getUserId());
                resUserLoginDto.setNickname(user.getNickname());
                resUserLoginDto.setIntroduce(user.getIntroduce());
                resUserLoginDto.setReturnCode(10000);
                resUserLoginDto.setReturnMsg(ResponseCodeMsg.of(10000).getResMsg());
                resUserLoginDto.setAccessToken(jwtProvider.createToken(user.getUserId(), user.getRoles())); // accessToken 발급

                List<ResAdminMenuCategoryDto>   adminMenuCategoryDtoList = new ArrayList<>();
                List<ResUserRoleDto>            userRoleDtoList          = new ArrayList<>();
                List<ResRoleDto>                roleDtoList              = new ArrayList<>();
                user.getRoles().stream().forEach(r -> {
                    setRoleList(r               , roleDtoList);                 // user에 부여된 role 정보 리스트 조회
                    setUserRoleAccessPathList(r , userRoleDtoList);             // user에 설정된 role에 해당하는, 접근 가능한 AccessPath(url, httpMethod) 정보 리스트 조회
                    setAdminMenuCategoryList(r  , adminMenuCategoryDtoList);    // user의 adminMenu 접근 가능 category & menu list 조회
                });
                resUserLoginDto.setRoleInfoList(roleDtoList);
                resUserLoginDto.setUserRoleInfoList(userRoleDtoList);
                resUserLoginDto.setAdminMenuCategoryList(adminMenuCategoryDtoList);

                // refresh token 발급(or 재사용)
                UserRefreshToken mergedRefreshToken = this.mergeRefreshToken(user);

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

    private void setRoleList(Authority r, List<ResRoleDto> roleDtoList) {
        ResRoleDto resRoleDto = new ResRoleDto();
        resRoleDto.setRoleId(r.getRole().getId());
        resRoleDto.setRoleName(r.getRole().getRoleName());
        resRoleDto.setRoleDesc(r.getRole().getRoleDescription());
        roleDtoList.add(resRoleDto);
    }
    private void setUserRoleAccessPathList(Authority r, List<ResUserRoleDto> userRoleDtoList) {
        ResUserRoleDto resUserRoleDto = new ResUserRoleDto();
        resUserRoleDto.setRoleName(r.getRole().getRoleName());
        resUserRoleDto.setRoleId(r.getRole().getId());

        List<ResUserRoleAccessPathDto> resUserRoleAccessPathDtoList = new ArrayList<>();
        r.getRole().getAccessPaths().stream().forEach(ap -> {
            ResUserRoleAccessPathDto resUserRoleAccessPathDto = new ResUserRoleAccessPathDto();
            resUserRoleAccessPathDto.setRoleAccessPathId(ap.getId());
            resUserRoleAccessPathDto.setUrl(ap.getUrl());
            resUserRoleAccessPathDto.setType(ap.getType());
            resUserRoleAccessPathDto.setHttpMethod(ap.getHttpMethod());
            resUserRoleAccessPathDtoList.add(resUserRoleAccessPathDto);
        });
        resUserRoleDto.setUserRoleAccessPathList(resUserRoleAccessPathDtoList);
        userRoleDtoList.add(resUserRoleDto);
    }

    private void setAdminMenuCategoryList(Authority r, List<ResAdminMenuCategoryDto> adminMenuCategoryDtoList) {
        r.getRole().getAdminMenuCategoryRoleAccesses().stream().forEach(amcra -> {
            String categoryName = amcra.getAdminMenuCategory().getCategoryName();

            List<ResAdminMenuRoleAccessPathDto> resAdminMenuRoleAccessPathDtoList  = new ArrayList<>();
            Optional<ResAdminMenuCategoryDto> resAdminMenuCategoryDtoOptional = adminMenuCategoryDtoList.stream().filter(amcdl -> amcdl.getCategoryId().equals(amcra.getAdminMenuCategory().getId())).findAny();
            boolean isAddedCategory = resAdminMenuCategoryDtoOptional.isPresent();

            ResAdminMenuCategoryDto resAdminMenuCategoryDto = null;

            if (isAddedCategory) {
                resAdminMenuCategoryDto = resAdminMenuCategoryDtoOptional.get();
                resAdminMenuRoleAccessPathDtoList = resAdminMenuCategoryDtoOptional.get().getRoleAccessPathList();
                adminMenuCategoryDtoList.remove(resAdminMenuCategoryDto);
            } else {
                resAdminMenuCategoryDto = new ResAdminMenuCategoryDto();
                resAdminMenuCategoryDto.setCategoryId(amcra.getAdminMenuCategory().getId());
                resAdminMenuCategoryDto.setCategoryName(categoryName);
            }

            log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> categoryName : {}, AdminMenuRoleAccessPaths size : {}, isAddedCategory : {}", categoryName, amcra.getAdminMenuCategory().getAdminMenuRoleAccessPaths().size(), isAddedCategory);
            List<ResAdminMenuRoleAccessPathDto> finalResAdminMenuRoleAccessPathDtoList = resAdminMenuRoleAccessPathDtoList;
            ResAdminMenuCategoryDto finalResAdminMenuCategoryDto = resAdminMenuCategoryDto;
            amcra.getAdminMenuCategory().getAdminMenuRoleAccessPaths().stream().forEach(amrap -> {

                if (amcra.getRole().equals(amrap.getRole())) {

                    boolean isEmptyRapl = CollectionUtils.isEmpty(finalResAdminMenuCategoryDto.getRoleAccessPathList());
                    boolean isAddedMenu = isEmptyRapl ? false
                            : finalResAdminMenuCategoryDto.getRoleAccessPathList()
                            .stream()
                            .anyMatch(rapl -> rapl.getUrl().equals(amrap.getAdminMenu().getMenuUrl())
                                    && rapl.getName().equals(amrap.getAdminMenu().getMenuName()));

                    if (!isAddedMenu) {
                        ResAdminMenuRoleAccessPathDto resRoleAccessPathDto = new ResAdminMenuRoleAccessPathDto();
                        resRoleAccessPathDto.setId(amrap.getAdminMenu().getId());
                        resRoleAccessPathDto.setUrl(amrap.getAdminMenu().getMenuUrl());
                        resRoleAccessPathDto.setName(amrap.getAdminMenu().getMenuName());

                        finalResAdminMenuRoleAccessPathDtoList.add(resRoleAccessPathDto);
                        finalResAdminMenuCategoryDto.setRoleAccessPathList(finalResAdminMenuRoleAccessPathDtoList);
                        log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> menuName : {}, menuUrl : {}", amrap.getAdminMenu().getMenuName(), amrap.getAdminMenu().getMenuUrl());
                    }
                }
            });
            adminMenuCategoryDtoList.add(finalResAdminMenuCategoryDto);
        });
    }

    private UserRefreshToken mergeRefreshToken(User user) {
        Optional<UserRefreshToken> refreshTokenOptional = userRefreshTokenRepository.findByUser(user);
        String              mergeRefreshTokenVal    = null;
        UserRefreshToken    refreshTokenObj         = null;
        UserRefreshToken    mergedRefreshToken      = null;
        if (!refreshTokenOptional.isPresent()) {
            mergeRefreshTokenVal = jwtProvider.createToken(user.getUserId(), user.getRoles());
            refreshTokenObj      = new UserRefreshToken();
            refreshTokenObj.setUser(user);
            refreshTokenObj.setRefreshToken(mergeRefreshTokenVal);
            mergedRefreshToken = userRefreshTokenRepository.save(refreshTokenObj);
        } else {
            mergedRefreshToken = refreshTokenOptional.get();
        }
        return mergedRefreshToken;
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
