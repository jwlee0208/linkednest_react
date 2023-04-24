package net.linkednest.common.entity.board;

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
@Table(name="boardArticle")
public class BoardArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @JoinColumn(name = "boardId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Board board;
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String contentText;
    private String imagePath;
    private Boolean isActive;
    @JsonBackReference
    @JoinColumn(name = "createUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User createUser;
    private Date createDate;
    @JsonBackReference
    @JoinColumn(name = "updateUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User updateUser;
    private Date updateDate;

}
