package net.linkednest.share.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.user.User;
import net.minidev.json.annotate.JsonIgnore;

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
    @JsonIgnore
    private ShareBoard      shareBoard;
    private String 			title;
    private String 			content;
    @JsonBackReference
    @JoinColumn(name = "createUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User            createUser;
    private String 			createDate;
    private String			filePath;
    private String			originalFileName;
    private int 			status = 0;


}
