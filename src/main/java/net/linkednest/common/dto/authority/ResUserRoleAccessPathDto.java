package net.linkednest.common.dto.authority;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResUserRoleAccessPathDto {
    private Long roleAccessPathId;
    private String url;
    // backend, front 구분
    private String type;
    // 유저가 사용할 수 있는 action에 대한 구분
    private String httpMethod;
}
