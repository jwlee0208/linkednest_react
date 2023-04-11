package net.linkednest.common.dto.authority;

import lombok.Data;
import net.linkednest.backoffice.dto.menu.ResAdminMenuCategoryDto;

import java.util.List;

@Data
public class ResUserRoleDto {

    private Long roleId;
    private String roleName;
    private List<ResUserRoleAccessPathDto> userRoleAccessPathList;
    private List<ResAdminMenuCategoryDto> adminMenuCategoryList;

}
