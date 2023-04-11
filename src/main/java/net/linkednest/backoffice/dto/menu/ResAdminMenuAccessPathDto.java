package net.linkednest.backoffice.dto.menu;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.common.dto.CommonResDto;

@Getter
@Setter
@ToString
public class ResAdminMenuAccessPathDto extends CommonResDto {
    private Long id;
    private Long menuId;
    private Long menuCategoryId;
    private String menuCategoryName;
    private String menuName;
    private String menuUrl;
    private Long roleId;
    private String roleName;

}
