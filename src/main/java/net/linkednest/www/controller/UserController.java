package net.linkednest.www.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import javax.print.attribute.standard.Media;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.www.dto.user.login.ReqUserLoginDto;
import net.linkednest.www.dto.user.login.ResUserLoginDto;
import net.linkednest.www.dto.user.regist.ReqUserRegistDto;
import net.linkednest.www.dto.user.regist.ResUserRegistDto;
import org.apache.http.entity.ContentType;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Controller
@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {

  @PostMapping(
    value = "/registUser",
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @Operation(
    summary = "회원 등록",
    description = "회원 등록 액션입니다.",
    tags = { "User Controller" },
    responses = {
      @ApiResponse(
        responseCode = "200",
        description = "회원가입 성공",
        content = @Content(
          schema = @Schema(implementation = ResUserRegistDto.class)
        )
      ),
    }
  )
  public ResponseEntity registUser(
    @RequestBody(
      required = true,
      description = "회원가입 요청 파라미터"
    ) ReqUserRegistDto reqUserRegistDto
  ) {
    String username = reqUserRegistDto.getUsername();
    String password = reqUserRegistDto.getPassword();
    String nickname = reqUserRegistDto.getNickname();

    log.info(
      "[registUser] username : {}, password : {}, nickname : {}",
      username,
      password,
      nickname
    );

    ResUserRegistDto resUserRegistDto = new ResUserRegistDto();
    resUserRegistDto.setUsername(username);
    resUserRegistDto.setNickname(nickname);
    resUserRegistDto.setReturnCode(10000);
    resUserRegistDto.setReturnMsg("SUCCESS");
    return new ResponseEntity(resUserRegistDto, HttpStatus.OK);
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
  public ResponseEntity login(@RequestBody ReqUserLoginDto reqUserLoginDto) {
    String username = reqUserLoginDto.getUsername();
    String password = reqUserLoginDto.getPassword();

    log.info(
      "[login] username : {}, password : {}, nickname : {}",
      username,
      password
    );

    ResUserLoginDto resUserLoginDto = new ResUserLoginDto();
    resUserLoginDto.setIsLogin(true);
    resUserLoginDto.setUsername(username);
    resUserLoginDto.setAccessToken(UUID.randomUUID().toString());
    resUserLoginDto.setReturnCode(10000);
    resUserLoginDto.setReturnMsg("SUCCESS");

    return ResponseEntity.ok(resUserLoginDto);
  }

  @PostMapping(value = "/logout")
  public ResponseEntity logout(HttpServletRequest request) {
    Map<String, Object> resObj = new HashMap<>();
    resObj.put("returnCode", "10000");
    resObj.put("isLogin", false);
    return ResponseEntity.ok(resObj);
  }
}
