package net.linkednest.share.dto;

import lombok.Data;

@Data
public class ReqShareBoardDto {
    private Long 	id;
    private Long    shareBoardCategoryId;
    private String 	shareBoardName;
    private String 	shareBoardType;
    private String  createUserId;
    private String  modifyUserId;
}
