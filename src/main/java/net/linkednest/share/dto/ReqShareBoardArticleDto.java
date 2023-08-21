package net.linkednest.share.dto;

import lombok.Data;

@Data
public class ReqShareBoardArticleDto {
    private Long id;
    private String title;
    private String content;
    private Long  shareBoardId;
    private String filePath;
    private String originalFilePath;
}
