package net.linkednest.common.dto.authority;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.backoffice.dto.menu.ResAdminMenuCategoryDto;

import java.util.List;

@Getter
@Setter
@ToString(exclude = {"userRoleAccessPathList", "adminMenuCategoryList"})
public class ResUserRoleDto {
    private Long roleId;
    private String roleName;
    private List<ResUserRoleAccessPathDto> userRoleAccessPathList;
    private List<ResAdminMenuCategoryDto> adminMenuCategoryList;

}
