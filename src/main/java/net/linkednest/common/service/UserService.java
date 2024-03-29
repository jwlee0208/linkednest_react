package net.linkednest.common.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.menu.ResAdminMenuCategoryDto;
import net.linkednest.common.CommonConstants;
import net.linkednest.common.ResponseCodeMsg;
import net.linkednest.common.dto.authority.ResAdminMenuRoleAccessPathDto;
import net.linkednest.common.dto.authority.ResRoleDto;
import net.linkednest.common.dto.authority.ResUserRoleAccessPathDto;
import net.linkednest.common.dto.authority.ResUserRoleDto;
import net.linkednest.common.dto.user.ResTokenDto;
import net.linkednest.common.dto.user.get.ResUserDto;
import net.linkednest.common.dto.user.signin.ReqUserLoginDto;
import net.linkednest.common.dto.user.signin.ReqUserTokenLoginDto;
import net.linkednest.common.dto.user.signin.ResUserLoginDto;
import net.linkednest.common.dto.user.signup.ReqUserRegistDto;
import net.linkednest.common.dto.user.signup.ResUserProfileDto;
import net.linkednest.common.entity.content.Content;
import net.linkednest.common.entity.menu.AdminMenu;
import net.linkednest.common.entity.menu.AdminMenuCategory;
import net.linkednest.common.entity.role.AdminMenuRoleAccessPath;
import net.linkednest.common.entity.role.Authority;
import net.linkednest.common.entity.role.Role;
import net.linkednest.common.entity.role.RoleAccessPath;
import net.linkednest.common.entity.user.LoggedIn;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.entity.user.UserProfile;
import net.linkednest.common.entity.user.UserRefreshToken;
import net.linkednest.common.repository.ContentRepository;
import net.linkednest.common.repository.RoleRepository;
import net.linkednest.common.repository.admin.AdminMenuRoleAccessPathRepository;
import net.linkednest.common.repository.auth.UserRefreshTokenRepository;
import net.linkednest.common.repository.user.LoggedInRepository;
import net.linkednest.common.repository.user.UserProfileRepository;
import net.linkednest.common.repository.user.UserRepository;
import net.linkednest.common.security.CustomUserDetails;
import net.linkednest.common.security.JwtProvider;
import net.linkednest.common.utils.CommonUtil;
import net.linkednest.common.utils.ReCaptchaUtil;
import net.linkednest.share.service.ShareService;
import net.linkednest.www.service.UserProfileService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserProfileService                    userProfileService;
    private final ShareService                          shareService;
    private final UserRepository                        userRepository;
    private final UserProfileRepository                 userProfileRepository;
    private final RoleRepository                        roleRepository;
    private final UserRefreshTokenRepository            userRefreshTokenRepository;
    private final AdminMenuRoleAccessPathRepository     adminMenuRoleAccessPathRepository;
    private final LoggedInRepository                    loggedInRepository;
    private final ContentRepository                     contentRepository;
    private final PasswordEncoder                       passwordEncoder;
    private final JwtProvider                           jwtProvider;

    @Transactional(rollbackOn = {DataIntegrityViolationException.class})
    public Boolean registUser(ReqUserRegistDto userRegistDto) {
        String  methodName          = new Object(){}.getClass().getEnclosingMethod().getName();
        String  reCaptchaToken      = StringUtils.defaultString(userRegistDto.getReCaptchaToken());
        boolean isReCaptchaVerified = ReCaptchaUtil.verifyV3(reCaptchaToken);

        if (isReCaptchaVerified) {
            log.info("[{}.{}] userRegistObj : {}", this.getClass().getName(), methodName, userRegistDto.toString());
            User newUser        = new User();
            User createdUser    = null;
            try {
                newUser.setUserId(new String(Base64.getDecoder().decode(userRegistDto.getUserId())));
                newUser.setEmail(userRegistDto.getEmail());
                newUser.setNickname(userRegistDto.getNickname());
                newUser.setPassword(passwordEncoder.encode(new String(Base64.getDecoder().decode(userRegistDto.getPassword()))));
                newUser.setIntroduce(StringUtils.defaultString(userRegistDto.getIntroduce()));

                Authority authority = new Authority();
                authority.setRole(roleRepository.getReferenceById(1L));
                newUser.setUserRoles(Collections.singletonList(authority));
                newUser.setCreateDate(new Date());

                log.info("[{}.{}] userRegist >> decoded : {}", this.getClass().getName(), methodName, newUser.toString());
                createdUser = userRepository.saveAndFlush(newUser);
                log.info("[{}.{}] createdUser : {}", this.getClass().getName(), methodName, createdUser);

                this.userProfileService.saveUserProfile(userRegistDto, createdUser);
                this.shareService.mergeShare(createdUser);
            } catch (Exception e) {
                if (createdUser != null) userRepository.delete(createdUser);
                log.error("[{}.{}] ERROR OCCURRED entity : {}, errorMsg : {}", this.getClass().getName(), methodName, newUser, e.getMessage());
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    public Boolean updateUser(ReqUserRegistDto userRegistDto) {
        log.info("[{}.{}] updateUser : {}", this.getClass().getName(), "updateUser", userRegistDto.toString());
        String  decodedUserId = new String(Base64.getDecoder().decode(userRegistDto.getUserId()));
        try {
            Optional<User> userOptional = this.findByUserId(decodedUserId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setUserId(decodedUserId);
                user.setEmail(userRegistDto.getEmail());
                user.setNickname(userRegistDto.getNickname());
                user.setIntroduce(StringUtils.defaultString(userRegistDto.getIntroduce()));
                user.setUpdateDate(new Date());
                log.info("[{}.{}] before update user : {}", this.getClass().getName(), "updateUser", user);

                userRepository.save(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
    public ResUserLoginDto login(ReqUserLoginDto reqUserLoginDto, HttpServletRequest request, HttpServletResponse response) {

        int returnCode = 10000;
        ResUserLoginDto resUserLoginDto = new ResUserLoginDto();
        User user = null;
        // google reCaptcha token 유효성 체크
        String reCaptchaToken = StringUtils.defaultString(reqUserLoginDto.getReCaptchaToken());

        boolean isVerified = ReCaptchaUtil.verifyV2(reCaptchaToken);

        if (isVerified) {
            String userId   = new String(Base64.getDecoder().decode(reqUserLoginDto.getUserId()));
            String password = new String(Base64.getDecoder().decode(reqUserLoginDto.getPassword()));

            Optional<User> userOptional = this.findByUserId(userId);
            if (userOptional.isPresent()) {
                user = userOptional.get();
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
        } else {
            returnCode = 20003;
        }
        resUserLoginDto.setReturnCode(returnCode);
        resUserLoginDto.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        resUserLoginDto.setIsLogin(returnCode == 10000);

        if (ObjectUtils.isNotEmpty(user) && returnCode == 10000) {
            this.setLoggedIn(request, user, CommonConstants.WEB_LOGIN_ACTION);
        }
        return resUserLoginDto;
    }

    public ResUserLoginDto tokenLogin(ReqUserTokenLoginDto reqUserTokenLoginDto, HttpServletRequest request, HttpServletResponse response) {

        int returnCode = 10000;
        ResUserLoginDto resUserLoginDto = new ResUserLoginDto();
        User user = null;
        boolean isVerified = true;

        if (isVerified) {
            String userId       = new String(Base64.getDecoder().decode(reqUserTokenLoginDto.getUserId()));
            String accessToken  = jwtProvider.resolveToken(request);
            boolean isValidToken = (accessToken != null && jwtProvider.validateToken(accessToken));
            log.info("[{}.{}] isValidToken : {}", this.getClass().getName(), "tokenLogin", isValidToken);
            if (isValidToken) {
                log.info("[{}.{}] token : {}", this.getClass().getName(), "tokenLogin", accessToken);
                // accessToken 확인
                accessToken = accessToken.split(" ")[1].trim();
                log.info("[{}.{}] accessToken 확인 : {}", this.getClass().getName(), "tokenLogin", accessToken);
                String tokenUserId = jwtProvider.getUserId(accessToken);
                log.info("[{}.{}] tokenUserId : {}, paramUserId : {}", this.getClass().getName(), "tokenLogin", tokenUserId, userId);

                Optional<User> userOptional = this.findByUserId(userId);
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                    // accessToken 체크
                    boolean isValidUserId = StringUtils.equals(userId, tokenUserId);
                    if (isValidToken && isValidUserId) {
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
            }
        } else {
            returnCode = 20003;
        }

        resUserLoginDto.setReturnCode(returnCode);
        resUserLoginDto.setReturnMsg(ResponseCodeMsg.of(returnCode).getResMsg());
        resUserLoginDto.setIsLogin(returnCode == 10000);

        if (ObjectUtils.isNotEmpty(user) && returnCode == 10000) {
            this.setLoggedIn(request, user, CommonConstants.WEB_TOKEN_LOGIN_ACTION);
        }

        return resUserLoginDto;
    }

    public void logout(HttpServletRequest request) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!principal.equals("anonymousUser")) {
            CustomUserDetails userDetails = (CustomUserDetails)principal;
            if (ObjectUtils.isNotEmpty(userDetails)) {
                User user = userDetails.getUser();
                this.setLoggedIn(request, user, CommonConstants.LOGOUT_ACTION);
            }
        }
    }

    @Async
    public void setLoggedIn(HttpServletRequest request, User user, String actionType) {
        String      ipAddr      = CommonUtil.getClientIp(request);
        String      refererUrl  = request.getHeader("referer");
        LoggedIn    loggedIn    = new LoggedIn();

        if (StringUtils.isNotEmpty(refererUrl)) {
            String[] pathArr = refererUrl.split("/");
            if (ObjectUtils.isNotEmpty(pathArr)) {
                String contentCode = pathArr[1];
                Optional<Content> contentOptional = contentRepository.findByContentCode(contentCode);
                if (contentOptional.isPresent()) {
                    loggedIn.setContent(contentOptional.get());
                }
            }
        }
        loggedIn.setUser(user);
        loggedIn.setActionType(actionType);
        loggedIn.setActionDate(new Date());
        loggedIn.setIpAddr(ipAddr);

        loggedInRepository.save(loggedIn);
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
        String methodName = new Object(){}.getClass().getEnclosingMethod().getName();
        amrapList.forEach(a -> {
            log.info("[{}.{}] AdminMenuRoleAccessPath : {}", this.getClass().getName(), methodName, a.getAdminMenu().getMenuName());
            AdminMenu         am           = a.getAdminMenu();
            AdminMenuCategory amc          = am.getAdminMenuCategory();
            String            categoryName = amc.getCategoryName();
            List<ResAdminMenuRoleAccessPathDto> resAdminMenuRoleAccessPathDtoList   = new ArrayList<>();
            Optional<ResAdminMenuCategoryDto>   resAdminMenuCategoryDtoOptional     = adminMenuCategoryDtoList.stream().filter(amcdl -> amcdl.getCategoryId().equals(amc.getId())).findAny();
            ResAdminMenuCategoryDto             resAdminMenuCategoryDto             = null;

            log.info("[{}.{}] resAdminMenuCategoryDtoOptional : {}", this.getClass().getName(), "setAdminMenuCategoryList", resAdminMenuCategoryDtoOptional.isPresent());
            boolean isAddedCategory = resAdminMenuCategoryDtoOptional.isPresent();

            if (isAddedCategory) {
                resAdminMenuCategoryDto             = resAdminMenuCategoryDtoOptional.get();
                resAdminMenuRoleAccessPathDtoList   = resAdminMenuCategoryDtoOptional.get().getAdminMenuRoleAccessPathList();
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

    public Optional<User> findByUserId(String userId) {
        return userRepository.findByUserId(userId);
    }

    public Optional<User> getUserByUserNo(Long userNo)  {
        return userRepository.findByUserNo(userNo);
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

    public List<ResUserDto> userList() {
        List<ResUserDto> userList = new ArrayList<>();
        userRepository.findAll().forEach(u -> {
            userList.add(this.getUser(u));
        });
        return userList;
    }
    public ResUserDto getUser(String userId) {
        Optional<User> userOptional = userRepository.findByUserId(userId);
        return userOptional.map(this::getUser).orElse(null);
    }
    public ResUserDto getUser(User u) {
        ResUserDto userObj = new ResUserDto();
        userObj.setUserNo(u.getUserNo());
        userObj.setUserId(u.getUserId());
        userObj.setEmail(u.getEmail());
        userObj.setNickname(u.getNickname());
        userObj.setIntroduce((u.getIntroduce()));
        userObj.setUserProfile(this.getUserProfile(u));

        List<ResUserRoleDto> userRoleList = new ArrayList<>();
        u.getUserRoles().forEach(r -> {
            userRoleList.add(this.getUserRole(r));
        });
        userObj.setUserRoleInfoList(userRoleList);

        return userObj;
    }
    private ResUserProfileDto getUserProfile(User u) {
        Optional<UserProfile> upOptional = userProfileRepository.findByUser(u);
        ResUserProfileDto userProfileObj = new ResUserProfileDto();
        if (upOptional.isPresent()){
            UserProfile up = upOptional.get();
            userProfileObj.setSex(up.getSex());
            userProfileObj.setBirthday(up.getBirthday());
            userProfileObj.setPhoneNo(up.getPhoneNo());
        }
        return userProfileObj;
    }
    private ResUserRoleDto getUserRole(Authority r) {
        ResUserRoleDto userRoleObj = new ResUserRoleDto();
        userRoleObj.setRoleName(r.getRole().getRoleName());
        userRoleObj.setRoleId(r.getRole().getId());
        // user menu role(for back-end)
        Role role = r.getRole();
        List<ResUserRoleAccessPathDto> userRoleAccessPathList = new ArrayList<>();
        role.getAccessPaths().forEach(ap -> {
            userRoleAccessPathList.add(this.getUserRoleAccessPath(ap));
        });
        userRoleObj.setUserRoleAccessPathList(userRoleAccessPathList);

        // user menu role(for front-end)
        List<ResAdminMenuCategoryDto> adminMenuCategoryList = new ArrayList<>();
        this.setAdminMenuCategoryList(r, adminMenuCategoryList);
        userRoleObj.setAdminMenuCategoryList(adminMenuCategoryList);
        return userRoleObj;
    }
    private ResUserRoleAccessPathDto getUserRoleAccessPath(RoleAccessPath ap) {
        ResUserRoleAccessPathDto userRoleAccessPathObj = new ResUserRoleAccessPathDto();
        userRoleAccessPathObj.setHttpMethod(ap.getHttpMethod());
        userRoleAccessPathObj.setUrl(ap.getUrl());
        userRoleAccessPathObj.setType(ap.getType());
        return userRoleAccessPathObj;
    }
}
