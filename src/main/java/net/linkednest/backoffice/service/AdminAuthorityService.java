package net.linkednest.backoffice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.linkednest.backoffice.dto.ResAuthorityDto;
import net.linkednest.backoffice.repository.AuthorityRepository;
import net.linkednest.common.entity.Authority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminAuthorityService {

    private final AuthorityRepository authorityRepository;

    public List<ResAuthorityDto> getUserRoleList() {

        List<ResAuthorityDto> userRoleList = new ArrayList<>();
        this.authorityRepository.findAll().stream().forEach(a -> {
            ResAuthorityDto resAuthorityDto = new ResAuthorityDto();
            resAuthorityDto.setRoleId(a.getRole().getId());
            resAuthorityDto.setRoleName(a.getRole().getRoleName());
            resAuthorityDto.setUserId(a.getUser().getUserId());
            resAuthorityDto.setUserNo(a.getUser().getUserNo());
            userRoleList.add(resAuthorityDto);
        });

        return userRoleList;
    }
}
