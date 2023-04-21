package net.linkednest.common.dto.board;

import lombok.Data;

import java.util.List;

@Data
public class ResBoardCategoryDto {
    private Long id;
    private Long contentId;
    private String contentCode;
    private String boardCategoryName;
    private String boardCategoryDesc;
    private String boardCategoryKeyword;
    private String boardCategoryCode;

    private List<ResBoardDto> boardList;
}
