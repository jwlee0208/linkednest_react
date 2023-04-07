package net.linkednest.backoffice.dto.menu;

import lombok.Data;

@Data
public class ReqAdminMenuAccessPathDto {
    private Long id;
    private Long menuCategoryId;
    private Long menuId;

    private Long roleId;

    private Long createUserNo;
    private Long updateUserNo;
}
