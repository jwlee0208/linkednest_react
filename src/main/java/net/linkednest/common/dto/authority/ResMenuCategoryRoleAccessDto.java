package net.linkednest.common.dto.authority;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.common.dto.CommonResDto;

@Getter
@Setter
@ToString
public class ResMenuCategoryRoleAccessDto extends CommonResDto {
    private Long id;
    private Long menuCategoryId;
    private String menuCategoryName;
    private Long roleId;
    private String roleName;
    private Long createUserNo;
    private Long updateUserNo;
}
