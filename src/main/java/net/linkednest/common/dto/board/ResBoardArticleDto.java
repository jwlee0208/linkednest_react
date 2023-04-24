package net.linkednest.common.dto.board;

import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public class ResBoardArticleDto {

    private Long id;
    private Long boardId;
    private String title;
    private String content;
    private String imagePath;
    private Boolean isActive;
    private Long createUserNo;
    private String createUserId;

    private String createDate;
    private Long updateUserNo;
    private String updateUserId;
    private String updateDate;
}
