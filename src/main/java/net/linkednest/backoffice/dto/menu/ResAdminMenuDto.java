package net.linkednest.backoffice.dto;

import lombok.Data;
import net.linkednest.www.dto.CommonResDto;

@Data
public class ResAdminMenuDto extends CommonResDto {

    private Long id;
    private String name;
    private String url;
    private boolean isShow;
    private Long categoryId;
    private String categoryName;

}
