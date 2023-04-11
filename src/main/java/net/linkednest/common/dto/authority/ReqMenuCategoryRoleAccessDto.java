package net.linkednest.common.dto.authority;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReqMenuCategoryRoleAccessDto {
    private Long id;
    private Long menuCategoryId;
    private Long roleId;
    private Long createUserNo;
    private Long updateUserNo;
}
