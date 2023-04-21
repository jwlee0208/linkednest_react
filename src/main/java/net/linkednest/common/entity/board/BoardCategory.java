package net.linkednest.common.entity.board;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.content.Content;
import net.linkednest.common.entity.user.User;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="boardCategory")
public class BoardCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    @JsonBackReference
    @JoinColumn(name = "contentNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Content content;

    public void setContent(Content content) {
        this.content = content;
    }

    @Column(unique = true)
    private String boardCategoryCode;
    private String boardCategoryKeyword;
    private String boardCategoryName;
    private String boardCategoryDesc;
    private Boolean isActive;

    @JsonManagedReference
    @OneToMany(mappedBy = "boardCategory", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Board> boardList;
    public void setBoardList(List<Board> boardList) {
        this.boardList = boardList;
        boardList.forEach(o -> o.setBoardCategory(this));
    }
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
