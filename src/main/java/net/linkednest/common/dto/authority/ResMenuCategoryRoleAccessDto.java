package net.linkednest.common.dto.authority;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;

@Data
public class ResMenuCategoryRoleAccessDto extends CommonResDto {
    private Long id;
    private Long menuCategoryId;
    private String menuCategoryName;
    private Long roleId;
    private String roleName;

    private Long createUserNo;

    private Long updateUserNo;
}
