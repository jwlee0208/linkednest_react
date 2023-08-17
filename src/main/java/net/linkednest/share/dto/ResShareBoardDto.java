package net.linkednest.share.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import net.linkednest.common.dto.CommonResDto;
import net.linkednest.common.entity.user.User;
import net.linkednest.share.entity.ShareBoardCategory;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Data
public class ResShareBoardDto extends CommonResDto {
    private Long 	id;
    private String 	boardName;
    private String 	boardType;
    private String createUserId;
    private Date createDate;
    private String modifyUserId;
    private Date modifyDate;
}
