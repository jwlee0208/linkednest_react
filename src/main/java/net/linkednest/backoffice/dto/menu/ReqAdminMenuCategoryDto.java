package net.linkednest.backoffice.dto;

import lombok.Data;

@Data
public class ReqAdminMenuCategoryDto {
    private Long categoryId;
    private String categoryName;

    private Boolean isActive;

    private Long createUser;

    private Long updateUser;



}
