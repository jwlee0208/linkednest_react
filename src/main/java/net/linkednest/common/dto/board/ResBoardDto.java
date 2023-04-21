package net.linkednest.common.dto.board;

import lombok.Data;

import java.util.Date;

@Data
public class ResBoardDto {
    private Long id;
    private Long boardCategoryId;
    private String boardName;
    private String boardCode;
    private String boardKeyword;
    private Boolean isActive;
    private String imgPath;
    private Date createDate;
    private Date updateDate;
}
