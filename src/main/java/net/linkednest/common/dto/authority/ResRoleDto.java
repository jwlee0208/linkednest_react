package net.linkednest.common.dto.authority;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResRoleDto {

    private Long roleId;
    private String roleName;
    private String roleDesc;
}
