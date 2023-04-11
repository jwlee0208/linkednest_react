package net.linkednest.backoffice.dto.menu;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReqAdminMenuAccessPathDto {
    private Long id;
    private Long menuCategoryId;
    private Long menuId;

    private Long roleId;

    private Long createUserNo;
    private Long updateUserNo;
}
