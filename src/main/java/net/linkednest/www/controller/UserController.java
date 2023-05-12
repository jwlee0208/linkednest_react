package net.linkednest.www.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.dto.user.ResTokenDto;
import net.linkednest.common.dto.user.get.ResUserDto;
import net.linkednest.common.dto.user.signin.ReqUserLoginDto;
import net.linkednest.common.dto.user.signin.ResUserLoginDto;
import net.linkednest.common.dto.user.signup.ReqUserRegistDto;
import net.linkednest.common.dto.user.signup.ResUserRegistDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.common.security.CustomUserDetails;
import net.linkednest.www.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
//@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {
  public static final String SUCCESS = "SUCCESS";
  public static final String FAIL = "FAIL";
  private final UserService userService;

  @PostMapping(
    value = "/user",
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @Operation(
    summary = "회원 등록",
    description = "회원 등록 액션입니다.",
    tags = { "User" },
    responses = {
      @ApiResponse(
        responseCode = "201",
        description = "회원가입 성공",
        content = @Content(
          schema = @Schema(implementation = ResUserRegistDto.class)
        )
      ),
      @ApiResponse(
        responseCode = "200",
        description = "회원가입 실패",
        content = @Content(
          schema = @Schema(implementation = ResUserRegistDto.class)
        )
      )
    }
  )
  public ResponseEntity<ResUserRegistDto> registUser(
    @RequestBody(
      required = true,
      description = "회원가입 요청 파라미터"
    ) ReqUserRegistDto reqUserRegistDto
  ) {
    String userId = reqUserRegistDto.getUserId();
    String password = reqUserRegistDto.getPassword();
    String nickname = reqUserRegistDto.getNickname();

    log.info("[registUser] userId : {}, password : {}, nickname : {}", userId, password, nickname);

    Boolean isSaved = userService.registUser(reqUserRegistDto);

    ResUserRegistDto resUserRegistDto = new ResUserRegistDto();

    resUserRegistDto.setUserId(userId);
    resUserRegistDto.setNickname(nickname);
    resUserRegistDto.setReturnCode(isSaved ? 10000 : 50000);
    resUserRegistDto.setReturnMsg(isSaved ? SUCCESS : FAIL);
    return new ResponseEntity<>(resUserRegistDto, isSaved ? HttpStatus.CREATED : HttpStatus.OK);
  }

  @PutMapping(value = "/user")
  @Operation(
          summary = "회원 정보 수정",
          description = "회원 정보 수정 액션입니다.",
          tags = { "User" },
          responses = {
                  @ApiResponse(
                          responseCode = "201",
                          description = "회원정보 수정 성공",
                          content = @Content(
                                  schema = @Schema(implementation = ResUserRegistDto.class)
                          )
                  ),
                  @ApiResponse(
                          responseCode = "200",
                          description = "회원정보 수정 실패",
                          content = @Content(
                                  schema = @Schema(implementation = ResUserRegistDto.class)
                          )
                  )
          }
  )

  public ResponseEntity<ResUserRegistDto> updateUser(
          @RequestBody(
                  required = true,
                  description = "회원정보 수정 요청 파라미터"
          ) ReqUserRegistDto reqUserRegistDto
  ) {
    String userId = reqUserRegistDto.getUserId();
    String password = reqUserRegistDto.getPassword();
    String nickname = reqUserRegistDto.getNickname();
    String introduce = reqUserRegistDto.getIntroduce();

    log.info("[updateUser] userId : {}, password : {}, nickname : {}, introduce : {}", userId, password, nickname, introduce);

    Boolean isSaved = userService.updateUser(reqUserRegistDto);

    ResUserRegistDto resUserRegistDto = new ResUserRegistDto();

    resUserRegistDto.setUserId(userId);
    resUserRegistDto.setNickname(nickname);
    resUserRegistDto.setIntroduce(introduce);
    resUserRegistDto.setReturnCode(isSaved ? 10000 : 50000);
    resUserRegistDto.setReturnMsg(isSaved ? SUCCESS : FAIL);
    return new ResponseEntity<>(resUserRegistDto, isSaved ? HttpStatus.CREATED : HttpStatus.OK);
  }

  @GetMapping(value = "/user/{userId}")
  @Operation(
          summary = "회원 정보 조회",
          description = "회원 정보 조회 액션입니다.",
          tags = { "User" },
          responses = {
                  @ApiResponse(
                          responseCode = "200",
                          description = "회원 정보 조회 성공",
                          content = @Content(
                                  schema = @Schema(implementation = ResUserDto.class)
                          )
                  ),
          }
  )
  public ResponseEntity<ResUserDto> getUser(
          @Parameter(name = "userId",
                  required = true,
                  description = "회원 정보 조회 요청 파라미터"
          ) @PathVariable(name = "userId") String userId
  ) {

    log.info("[getUser] userId : {}", userId);

    ResUserDto resUserDto = new ResUserDto();
    Optional<User> userOptional = userService.getUser(userId);

    boolean isExistUser = userOptional.isPresent();
    if (userOptional.isPresent()) {
      resUserDto.setUserId(userOptional.get().getUserId());
      resUserDto.setNickname(userOptional.get().getNickname());
    }
    resUserDto.setReturnCode(isExistUser ? 10000 : 50000);
    resUserDto.setReturnMsg(isExistUser ? SUCCESS : FAIL);

    return new ResponseEntity<>(resUserDto, (isExistUser ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR));
  }

  @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(
    summary = "회원 로그인",
    description = "회원 로그인 액션입니다.",
    tags = { "User" },
    responses = {
      @ApiResponse(
        responseCode = "200",
        description = "회원 로그인 성공",
        content = @Content(
          schema = @Schema(implementation = ResUserLoginDto.class)
        )
      ),
    }
  )
  public ResponseEntity<ResUserLoginDto> login(@RequestBody ReqUserLoginDto reqUserLoginDto, HttpServletRequest request, HttpServletResponse response) {
    String userId   = reqUserLoginDto.getUserId();
    String password = reqUserLoginDto.getPassword();

    log.info("[login] userId : {}, password : {}", userId, password);
    ResUserLoginDto resUserLoginDto = userService.login(reqUserLoginDto, request, response);
//    return new ResponseEntity<>(resUserLoginDto, resUserLoginDto.getReturnCode() == 10000 ? HttpStatus.OK : HttpStatus.UNAUTHORIZED);
    return new ResponseEntity<ResUserLoginDto>(resUserLoginDto, HttpStatus.OK);
  }

  @PostMapping(value = "/api/logout")
  @Operation(
          summary = "회원 로그아웃",
          description = "회원 로그아웃 액션입니다.",
          tags = { "User" },
          responses = {
                  @ApiResponse(
                          responseCode = "200",
                          description = "회원 로그아웃 성공"
                  ),
          }
  )
  public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
    this.userService.logout(request);
    Map<String, Object> resObj = new HashMap<>();
    resObj.put("returnCode", "10000");
    resObj.put("isLogin"   , false);
    return ResponseEntity.ok(resObj);
  }

  @Operation(
          summary = "회원 액세스 토큰 재발행",
          description = "회원 액세스 토큰 재발행 액션입니다.",
          tags = { "User" },
          responses = {
                  @ApiResponse(
                          responseCode = "200",
                          description = "회원 액세스 토큰 재발행 성공",
                          content = @Content(
                                  schema = @Schema(implementation = ResTokenDto.class)
                          )
                  ),
          }
  )
  @PostMapping("/reIssueToken")
  public ResponseEntity<ResTokenDto> reIssueToken(String refreshToken) {
    ResTokenDto resTokenDto = this.userService.reIssueToken(refreshToken);
    return ResponseEntity.ok(resTokenDto);
  }
}
