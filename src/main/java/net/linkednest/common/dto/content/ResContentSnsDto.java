package net.linkednest.common.dto.content;

import lombok.Data;
import net.linkednest.common.entity.content.Content;

@Data
public class ResContentSnsDto {
    private Long contentSnsId;
    private Content content;
    private String  snsType;
    private String  snsUrl;
}
