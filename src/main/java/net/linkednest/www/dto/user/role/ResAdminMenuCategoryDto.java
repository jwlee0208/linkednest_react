package net.linkednest.www.dto.user.role;

import lombok.Data;

import java.util.List;

@Data
public class ResAdminMenuCategoryDto {

    private Long categoryId;
    private String categoryName;

    private List<ResAdminMenuRoleAccessPathDto> roleAccessPathList;
}
