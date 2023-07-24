package net.linkednest.share.dto;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;

import java.util.Date;

@Data
public class ResShareDto extends CommonResDto {
    private Long id;
    private String shareName;
    private String shareType;
    private String introduce;
    private Long userNo;
    private Date createDate;

}
