package net.linkednest.share.dto;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.share.entity.ShareBoardCategory;

import java.util.List;

@Data
public class ResShareBoardCategoryListDto extends CommonResDto {
    private List<ShareBoardCategory> shareBoardCategoryList;
}
