package net.linkednest.share.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoardCategory;
import net.minidev.json.annotate.JsonIgnore;

@Data
public class ReqShareBoardDto {
    private Long 	id;
    private Long    shareBoardCategoryId;
    private String 	shareBoardName;
    private String 	shareBoardType;
    private String  createUserId;
    private String  modifyUserId;
}
