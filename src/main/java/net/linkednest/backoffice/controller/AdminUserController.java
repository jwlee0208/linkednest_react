package net.linkednest.backoffice.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import net.linkednest.backoffice.service.AdminUserService;
import net.linkednest.common.entity.Authority;
import net.linkednest.common.entity.User;
import net.linkednest.www.repository.UserRepository;
import net.linkednest.www.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/admin/user")
@RequiredArgsConstructor
public class AdminUserController {

    private AdminUserService adminUserService;

    private UserService userService;


    @RequestMapping(value = "/list", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<List<User>> getUserList(HttpServletRequest request) {
        List<User> userList = adminUserService.userList();
        return ResponseEntity.ok(userList);
    }

    @GetMapping(value="/{userId}")
    public ResponseEntity<User> getUserInfo(@PathVariable(name = "userId", required = true) String userId) {

        Optional<User> userInfo = userService.getUser(StringUtils.defaultString(userId));
        return ResponseEntity.ok(userInfo.get());
    }
}
