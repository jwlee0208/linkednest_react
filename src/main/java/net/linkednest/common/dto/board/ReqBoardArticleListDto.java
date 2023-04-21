package net.linkednest.common.dto.board;

import lombok.Data;
import org.springframework.web.bind.annotation.PathVariable;

@Data
public class ReqBoardArticleListDto {
    private String contentCode;
    private String boardCategoryKeyword;
    private String boardKeyword;

}
