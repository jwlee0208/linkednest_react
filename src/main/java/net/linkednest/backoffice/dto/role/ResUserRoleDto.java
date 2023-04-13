package net.linkednest.backoffice.dto.role;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;

import java.util.List;

@Data
public class ResUserRoleDto extends CommonResDto {
    private String userId;
    private List<Long> roleIds;
}
