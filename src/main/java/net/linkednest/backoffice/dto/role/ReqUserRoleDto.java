package net.linkednest.backoffice.dto.role;

import lombok.Data;

import java.util.List;

@Data
public class ReqUserRoleDto {
    private String userId;
    private List<Long> roleIds;
}
