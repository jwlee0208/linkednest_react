package net.linkednest.www.dto.user.role;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResAdminMenuRoleAccessPathDto implements Serializable {
    static final long serialVersionUID = 1L;
    private Long id;
    private String url;
    // backend, front 구분
    private String name;

}
