package net.linkednest.common.dto.content;

import lombok.Data;

import java.util.List;

@Data
public class ResContentDto {
    private Long                    contentId;
    private String                  contentName;
    private String                  contentCode;
    private String                  contentType;
    private String                  contentDesc;
    private Boolean                 isActive;
    private int                     usableLevel;
    private Integer                 layoutType;
    private String                  status;
    private List<ResContentSnsDto>  contentSnsList;
    private ResContentCreator       contentCreator;
}