package net.linkednest.share.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.user.User;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name="shareBoardArticle")
public class ShareBoardArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long	   		id;

    @JsonBackReference
    @JoinColumn(name = "shareBoardCategoryId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private ShareBoardCategory shareBoardCategory;
    @JsonBackReference
    @JoinColumn(name = "shareBoardId")
    @ManyToOne(fetch = FetchType.LAZY)
    private ShareBoard      shareBoard;
    private String 			title;
    @Column(columnDefinition = "LONGTEXT")
    private String 			content;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String          contentText;
    @JsonBackReference
    @JoinColumn(name = "createUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    private User            createUser;
    private Date            createDate;
    @JsonBackReference
    @JoinColumn(name = "modifyUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    private User            modifyUser;
    private Date            modifyDate;
    private String			filePath;
    private String			originalFileName;
    private int 			status = 0;


}
