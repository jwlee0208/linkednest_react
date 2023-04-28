package net.linkednest.common.dto.content;

import lombok.Data;

import java.util.List;

@Data
public class ResContentCategoryDto {
    private Long   id;
    private Long   parentId;
    private String categoryCode;
    private String categoryName;
    private Integer depth;
    private Boolean isActive;
    private List<ResContentCategoryDto> childCategoryList;
    private List<ResContentDto> contentList;
}
