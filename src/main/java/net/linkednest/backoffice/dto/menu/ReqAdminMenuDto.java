package net.linkednest.backoffice.dto.menu;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReqAdminMenuDto {
    private Long id;
    private Long categoryId;
    private String name;
    private String url;
    private Boolean show;
    private Long createUser;
    private Long updateUser;
}
