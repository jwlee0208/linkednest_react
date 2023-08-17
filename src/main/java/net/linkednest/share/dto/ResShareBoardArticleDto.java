package net.linkednest.share.dto;

import lombok.Data;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoard;
import net.linkednest.share.entity.ShareBoardCategory;

@Data
public class ResShareBoardArticleDto extends CommonResDto {
    private Long	   		id;
    private ShareBoardCategory shareBoardCategory;
    private ShareBoard      shareBoard;
    private String 			title;
    private String 			content;
    private User            createUser;
    private String 			createDate;
    private String			filePath;
    private String			originalFileName;
    private int 			status;
}
