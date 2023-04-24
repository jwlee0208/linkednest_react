package net.linkednest.common.dto.board;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import net.linkednest.common.entity.board.Board;
import net.linkednest.common.entity.user.User;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Data
public class ReqBoardArticleDto {
    private Long id;
    private Long boardId;
    private String title;
    private String content;
    private String imagePath;
    private Boolean isActive;
    private Long createUserNo;
    private Date createDate;
    private Long updateUser;
    private Date updateDate;

}
