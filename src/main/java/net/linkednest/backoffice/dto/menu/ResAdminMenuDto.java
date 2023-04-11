package net.linkednest.backoffice.dto.menu;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.common.dto.CommonResDto;

@Getter
@Setter
@ToString
public class ResAdminMenuDto extends CommonResDto {

    private Long id;
    private String name;
    private String url;
    private boolean isShow;
    private Long categoryId;
    private String categoryName;

}
