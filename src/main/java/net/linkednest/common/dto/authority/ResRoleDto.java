package net.linkednest.common.dto.authority;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.common.dto.CommonResDto;

@Getter
@Setter
@ToString
public class ResRoleDto extends CommonResDto {

    private Long roleId;
    private String roleName;
    private String roleDesc;
}
