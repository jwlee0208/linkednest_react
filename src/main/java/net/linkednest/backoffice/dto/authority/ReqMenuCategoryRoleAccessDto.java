package net.linkednest.backoffice.dto.authority;

import lombok.Data;

@Data
public class ReqMenuCategoryRoleAccessDto {
    private Long id;
    private Long menuCategoryId;
    private Long roleId;
    private Long createUserNo;
    private Long updateUserNo;
}
