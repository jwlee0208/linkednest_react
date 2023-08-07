package net.linkednest.share.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoard;
import net.linkednest.share.entity.ShareBoardCategory;
import net.minidev.json.annotate.JsonIgnore;

@Data
public class ResShareBoardArticleDto {
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
