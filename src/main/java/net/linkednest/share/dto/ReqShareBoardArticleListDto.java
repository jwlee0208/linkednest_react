package net.linkednest.share.dto;

import lombok.Data;

@Data
public class ReqShareBoardArticleListDto {
    private String shareUserId;
    private long shareBoardCategoryId;
    private long shareBoardId;
    private int offset;
    private int limit;
}
