package net.linkednest.www.dto.user.role;

import lombok.Data;

import java.util.List;

@Data
public class ResUserRoleDto {

    private Long roleId;
    private String roleName;
    private List<ResUserRoleAccessPathDto> userRoleAccessPathList;

}
