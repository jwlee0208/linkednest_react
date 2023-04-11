package net.linkednest.common.dto.authority;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResAdminMenuRoleAccessPathDto {
    private Long id;
    private String url;
    private String name;
    private Boolean isShow;
}
