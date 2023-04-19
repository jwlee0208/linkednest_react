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
@Table(name="board")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @JoinColumn(name = "boardCategoryId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private BoardCategory boardCategory;
    private String boardName;
    private Boolean isActive;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(columnDefinition = "TEXT")
    private String contentText;
    private String imagePath;
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
