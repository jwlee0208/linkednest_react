package net.linkednest.share.dto;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;

import java.util.List;

@Data
public class ResShareBoardArticleListDto extends CommonResDto {
    private List<ResShareBoardArticleDto> shareBoardArticleList;
    private int  totalPages;
}
