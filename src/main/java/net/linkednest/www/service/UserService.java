package net.linkednest.www.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.menu.ResAdminMenuCategoryDto;
import net.linkednest.common.dto.authority.ResAdminMenuRoleAccessPathDto;
import net.linkednest.common.dto.authority.ResRoleDto;
import net.linkednest.common.dto.authority.ResUserRoleAccessPathDto;
import net.linkednest.common.dto.authority.ResUserRoleDto;
import net.linkednest.common.entity.menu.AdminMenu;
import net.linkednest.common.entity.menu.AdminMenuCategory;
import net.linkednest.common.entity.role.AdminMenuRoleAccessPath;
import net.linkednest.common.entity.role.Authority;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.entity.user.UserRefreshToken;
import net.linkednest.common.repository.AdminMenuRoleAccessPathRepository;
import net.linkednest.common.CommonConstants;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.repository.RoleRepository;
import net.linkednest.common.repository.UserRefreshTokenRepository;
import net.linkednest.common.repository.UserRepository;
import net.linkednest.common.dto.user.ResTokenDto;
import net.linkednest.common.dto.user.signin.ReqUserLoginDto;
import net.linkednest.common.dto.user.signin.ResUserLoginDto;
import net.linkednest.common.dto.user.signup.ReqUserRegistDto;
import net.linkednest.common.security.JwtProvider;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserProfileService                    userProfileService;
    private final UserRepository                        userRepository;
    private final RoleRepository                        roleRepository;
    private final UserRefreshTokenRepository            userRefreshTokenRepository;
    private final AdminMenuRoleAccessPathRepository     adminMenuRoleAccessPathRepository;
    private final PasswordEncoder                       passwordEncoder;
    private final JwtProvider                           jwtProvider;

    public Boolean registUser(ReqUserRegistDto userRegistDto) {
        log.info("[{}.{}] userRegistObj : {}", this.getClass().getName(), "registUser", userRegistDto.toString());
        User newUser = new User();

        try {
            newUser.setUserId(new String(Base64.getDecoder().decode(userRegistDto.getUserId())));
            newUser.setEmail(userRegistDto.getEmail());
            newUser.setNickname(userRegistDto.getNickname());
            newUser.setPassword(passwordEncoder.encode(new String(Base64.getDecoder().decode(userRegistDto.getPassword()))));
            newUser.setIntroduce(StringUtils.defaultString(userRegistDto.getIntroduce()));

            Authority authority = new Authority();
            authority.setRole(roleRepository.getReferenceById(1L));
            newUser.setUserRoles(Collections.singletonList(authority));

            log.info("[{}.{}] userRegist >> decoded : {}", this.getClass().getName(), "registUser", newUser.toString());

            try {
                User createdUser = userRepository.saveAndFlush(newUser);
                log.info("[{}.{}] createdUser : {}", this.getClass().getName(), "registUser", createdUser);
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
            log.error("[{}.{}] userRepository.save ERROR OCCURRED entity : {}, errorMsg : {}", this.getClass().getName(), "registUser", newUser, e.getMessage());e.printStackTrace();
            return false;
        }
        return true;
    }

    public Boolean updateUser(ReqUserRegistDto userRegistDto) {
        log.info("[{}.{}] updateUser : {}", this.getClass().getName(), "updateUser", userRegistDto.toString());
        String  decodedUserId   = new String(Base64.getDecoder().decode(userRegistDto.getUserId()));
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

        int returnCode = 10000;
        ResUserLoginDto resUserLoginDto = new ResUserLoginDto();

        String userId   = new String(Base64.getDecoder().decode(reqUserLoginDto.getUserId()));
        String password = new String(Base64.getDecoder().decode(reqUserLoginDto.getPassword()));

        Optional<User> userOptional = this.getUser(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // password check
            boolean isMatchedPw = passwordEncoder.matches(password, user.getPassword());
            if (isMatchedPw) {
                resUserLoginDto.setIsLogin(true);
                resUserLoginDto.setUserNo(user.getUserNo());
                resUserLoginDto.setEmail(user.getEmail());
                resUserLoginDto.setUserId(user.getUserId());
                resUserLoginDto.setNickname(user.getNickname());
                resUserLoginDto.setIntroduce(user.getIntroduce());
                resUserLoginDto.setAccessToken(jwtProvider.createToken(user.getUserId(), user.getUserRoles())); // accessToken 발급

                List<ResUserRoleDto>            userRoleDtoList          = new ArrayList<>();
                List<ResRoleDto>                roleDtoList              = new ArrayList<>();
                List<ResAdminMenuCategoryDto>   adminMenuCategoryDtoList = new ArrayList<>();

                user.getUserRoles()
                        .forEach(r -> {
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
                returnCode = 20001;
            }
        } else {
            returnCode = 20002;
        }
        resUserLoginDto.setReturnCode(returnCode);
        resUserLoginDto.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        resUserLoginDto.setIsLogin(returnCode == 10000);

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
        r.getRole().getAccessPaths().forEach(ap -> {
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

    public void setAdminMenuCategoryList(Authority r, List<ResAdminMenuCategoryDto> adminMenuCategoryDtoList) {
        List<AdminMenuRoleAccessPath> amrapList = adminMenuRoleAccessPathRepository.findAllByRoleId(r.getRole().getId(), Sort.by(Sort.Direction.ASC, "adminMenu.adminMenuCategory.sortSeq", "adminMenu.sortSeq"));

        amrapList.forEach(a -> {
            log.info("[{}.{}] AdminMenuRoleAccessPath : {}", this.getClass().getName(), "setAdminMenuCategoryList", a.getAdminMenu().getMenuName());
            AdminMenu am  = a.getAdminMenu();
            AdminMenuCategory amc = am.getAdminMenuCategory();
            String              categoryName = amc.getCategoryName();
            List<ResAdminMenuRoleAccessPathDto> resAdminMenuRoleAccessPathDtoList   = new ArrayList<>();
            Optional<ResAdminMenuCategoryDto>   resAdminMenuCategoryDtoOptional     = adminMenuCategoryDtoList.stream().filter(amcdl -> amcdl.getCategoryId().equals(amc.getId())).findAny();
            ResAdminMenuCategoryDto             resAdminMenuCategoryDto             = null;

            log.info("[{}.{}] resAdminMenuCategoryDtoOptional : {}", this.getClass().getName(), "setAdminMenuCategoryList", resAdminMenuCategoryDtoOptional.isPresent());

            boolean isAddedCategory = resAdminMenuCategoryDtoOptional.isPresent();

            if (isAddedCategory) {
                resAdminMenuCategoryDto = resAdminMenuCategoryDtoOptional.get();
                resAdminMenuRoleAccessPathDtoList = resAdminMenuCategoryDtoOptional.get().getAdminMenuRoleAccessPathList();
                adminMenuCategoryDtoList.remove(resAdminMenuCategoryDto);

                log.info("[{}.{}] resAdminMenuRoleAccessPathDtoList : {}", this.getClass().getName(), "setAdminMenuCategoryList", resAdminMenuRoleAccessPathDtoList);

            } else {
                resAdminMenuCategoryDto = new ResAdminMenuCategoryDto();
                resAdminMenuCategoryDto.setCategoryId(amc.getId());
                resAdminMenuCategoryDto.setCategoryName(categoryName);
            }

            List<ResAdminMenuRoleAccessPathDto> finalResAdminMenuRoleAccessPathDtoList
                    = (CollectionUtils.isEmpty(resAdminMenuRoleAccessPathDtoList)) ? new ArrayList<>() : resAdminMenuRoleAccessPathDtoList;
            ResAdminMenuCategoryDto finalResAdminMenuCategoryDto = resAdminMenuCategoryDto;
            r.getRole().getAdminMenuCategoryRoleAccesses()
                    .stream()
                    .filter(adminMenuCategoryRoleAccess -> a.getAdminMenu().getAdminMenuCategory().getId().equals(adminMenuCategoryRoleAccess.getAdminMenuCategory().getId()))
                    .forEach(adminMenuCategoryRoleAccess -> {
                        Optional<ResAdminMenuRoleAccessPathDto> fam = finalResAdminMenuRoleAccessPathDtoList.stream().filter(framrap -> framrap.getId().equals(am.getId())).findAny();
                        boolean isAddedMenu = fam.isPresent();
                        if (!isAddedMenu) {
                            ResAdminMenuRoleAccessPathDto resRoleAccessPathDto = new ResAdminMenuRoleAccessPathDto();
                            resRoleAccessPathDto.setId(am.getId());
                            resRoleAccessPathDto.setUrl(am.getMenuUrl());
                            resRoleAccessPathDto.setName(am.getMenuName());
                            resRoleAccessPathDto.setIsShow(am.getIsShow());

                            finalResAdminMenuRoleAccessPathDtoList.add(resRoleAccessPathDto);
                        }
                        finalResAdminMenuCategoryDto.setAdminMenuRoleAccessPathList(finalResAdminMenuRoleAccessPathDtoList);
                    });
            log.info("[{}.{}] finalResAdminMenuRoleAccessPathDtoList : {}", this.getClass().getName(), "login", finalResAdminMenuRoleAccessPathDtoList);

            adminMenuCategoryDtoList.add(finalResAdminMenuCategoryDto);
        });
    }

    private UserRefreshToken mergeRefreshToken(User user) {
        Optional<UserRefreshToken> refreshTokenOptional = userRefreshTokenRepository.findByUser(user);
        String              mergeRefreshTokenVal    = null;
        UserRefreshToken    refreshTokenObj         = null;
        UserRefreshToken    mergedRefreshToken      = null;
        if (refreshTokenOptional.isEmpty()) {
            mergeRefreshTokenVal = jwtProvider.createToken(user.getUserId(), user.getUserRoles());
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
            resTokenDto.setAccessToken(jwtProvider.createToken(userRefreshToken.getUser().getUserId(), userRefreshToken.getUser().getUserRoles()));
            resTokenDto.setRefreshToken(refreshToken);
        }
        resTokenDto.setReturnCode(userRefreshTokenOptional.isPresent() ? 10000 : 50000);
        resTokenDto.setReturnMsg(userRefreshTokenOptional.isPresent() ? ResponseCodeMsg.of(10000).getResMsg() : "FAIL");
        return resTokenDto;
    }
}
