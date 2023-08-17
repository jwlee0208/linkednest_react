package net.linkednest.share.dto;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;

import java.util.Date;

@Data
public class ResShareBoardDto extends CommonResDto {
    private Long 	id;
    private String 	boardName;
    private String 	boardType;
    private String createUserId;
    private Date createDate;

    private String modifyUserId;
    private Date modifyDate;
}
