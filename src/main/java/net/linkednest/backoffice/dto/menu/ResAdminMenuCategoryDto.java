package net.linkednest.backoffice.dto.menu;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.dto.authority.ResAdminMenuRoleAccessPathDto;

import java.util.List;

@Data
public class ResAdminMenuCategoryDto extends CommonResDto {

    private Long categoryId;

    private String categoryName;

    private Boolean isActive;

    private List<ResAdminMenuRoleAccessPathDto> adminMenuRoleAccessPathList;

}
