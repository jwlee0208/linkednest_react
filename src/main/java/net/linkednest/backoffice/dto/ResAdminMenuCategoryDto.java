package net.linkednest.backoffice.dto;

import lombok.Data;
import net.linkednest.www.dto.CommonResDto;

@Data
public class ResAdminMenuCategoryDto extends CommonResDto {

    private Long categoryId;

    private String categoryName;

    private Boolean isActive;

}
