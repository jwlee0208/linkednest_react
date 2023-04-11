package net.linkednest.backoffice.dto.menu;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;

@Data
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
