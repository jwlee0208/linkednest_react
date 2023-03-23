package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.common.entity.Authority;
import net.linkednest.common.entity.RoleAccessPath;
import net.linkednest.common.entity.User;
import net.linkednest.www.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminUserService {
    private UserRepository userRepository;

    public List<User> userList() {
        return userRepository.findAll();
    }
}
