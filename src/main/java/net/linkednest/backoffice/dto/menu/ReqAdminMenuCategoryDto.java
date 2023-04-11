package net.linkednest.backoffice.dto.menu;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReqAdminMenuCategoryDto {
    private Long categoryId;
    private String categoryName;

    private Boolean isActive;

    private Long createUser;

    private Long updateUser;



}
