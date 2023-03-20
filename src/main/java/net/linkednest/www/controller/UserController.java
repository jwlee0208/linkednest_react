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
import lombok.extern.slf4j.Slf4j;
import net.linkednest.www.dto.user.ResTokenDto;
import net.linkednest.www.dto.user.get.ResUserDto;
import net.linkednest.www.dto.user.signin.ReqUserLoginDto;
import net.linkednest.www.dto.user.signin.ResUserLoginDto;
import net.linkednest.www.dto.user.signup.ReqUserRegistDto;
import net.linkednest.www.dto.user.signup.ResUserRegistDto;
import net.linkednest.www.entity.User;
import net.linkednest.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
//@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {


  @Autowired
  private UserService userService;

  @PostMapping(
    value = "/user",
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @Operation(
    summary = "회원 등록",
    description = "회원 등록 액션입니다.",
    tags = { "User Controller" },
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
    String username = reqUserRegistDto.getUsername();
    String password = reqUserRegistDto.getPassword();
    String nickname = reqUserRegistDto.getNickname();

    log.info("[registUser] username : {}, password : {}, nickname : {}", username, password, nickname);

    Boolean isSaved = userService.registUser(reqUserRegistDto);

    ResUserRegistDto resUserRegistDto = new ResUserRegistDto();

    resUserRegistDto.setUsername(username);
    resUserRegistDto.setNickname(nickname);
    resUserRegistDto.setReturnCode(isSaved ? 10000 : 50000);
    resUserRegistDto.setReturnMsg(isSaved ? "SUCCESS" : "FAIL");
    return new ResponseEntity<>(resUserRegistDto, isSaved ? HttpStatus.CREATED : HttpStatus.OK);
  }


  @GetMapping(value = "/user/{userId}")
  @Operation(
          summary = "회원 정보 조회",
          description = "회원 정보 조회 액션입니다.",
          tags = { "User Controller" },
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
    resUserDto.setReturnMsg(isExistUser ? "SUCCESS" : "FAIL");

    return ResponseEntity.ok(resUserDto);
  }

  @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(
    summary = "회원 로그인",
    description = "회원 로그인 액션입니다.",
    tags = { "User Controller" },
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
  public ResponseEntity<ResUserLoginDto> login(@RequestBody ReqUserLoginDto reqUserLoginDto, HttpServletResponse response) {
    String username = reqUserLoginDto.getUsername();
    String password = reqUserLoginDto.getPassword();

    log.info(
      "[login] username : {}, password : {}, nickname : {}",
      username,
      password
    );

    ResUserLoginDto resUserLoginDto = userService.login(reqUserLoginDto, response);

    return new ResponseEntity<>(resUserLoginDto, HttpStatus.OK);
  }

  @PostMapping(value = "/logout")
  public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
    Map<String, Object> resObj = new HashMap<>();
    resObj.put("returnCode", "10000");
    resObj.put("isLogin", false);
    return ResponseEntity.ok(resObj);
  }

  @PostMapping("/reIssueToken")
  public ResponseEntity<ResTokenDto> reIssueToken(String refreshToken) {
    ResTokenDto resTokenDto = this.userService.reIssueToken(refreshToken);
    return ResponseEntity.ok(resTokenDto);
  }
}
