package net.linkednest.backoffice.dto;

import lombok.Data;

@Data
public class ReqAdminMenuDto {
    private Long id;

    private Long categoryId;

    private String name;

    private String url;
    private Boolean show;

    private Long createUser;

    private Long updateUser;
}
