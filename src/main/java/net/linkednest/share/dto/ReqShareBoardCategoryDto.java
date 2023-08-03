package net.linkednest.share.dto;

import lombok.Data;

@Data
public class ReqShareBoardCategoryDto {
    private Long    boardCategoryId;
    private String  boardCategoryName;
    private String  createUserId;
    private String  createDate;
}
