package net.linkednest.common.entity.content;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.board.BoardCategory;
import net.linkednest.common.entity.user.User;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long            id;
    private String          contentName;
    private String          contentCode;
    private String          contentType;
    private String          contentDesc;
    private Boolean         isActive;
    private int             usableLevel;
    private Integer         layoutType;
    private String          status;
    @JsonBackReference
    @JoinColumn(name = "contentCreatorId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private ContentCreator contentCreator;
    public void setContentCreator(ContentCreator contentCreator) {
        this.contentCreator = contentCreator;
    }
    @JsonManagedReference
    @OneToOne(mappedBy = "content", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private ContentMetatag contentMetatag;
    public void setContentMetatag(ContentMetatag contentMetatag) {
        this.contentMetatag = contentMetatag;
    }
    @JsonManagedReference
    @OneToMany(mappedBy = "content", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<ContentSns> contentSnsList;
    public void setContentSnsList(List<ContentSns> contentSnsList) {
        this.contentSnsList = contentSnsList;
        contentSnsList.forEach(o -> o.setContent(this));
    }
    @JsonManagedReference
    @OneToMany(mappedBy = "content", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<BoardCategory> boardCategoryList;
    public void setBoardCategoryList(List<BoardCategory> boardCategoryList) {
        this.boardCategoryList = boardCategoryList;
        boardCategoryList.forEach(o -> o.setContent(this));
    }

    private String          homepageUrl;
    private String          imagePath;
    private String          logoImagePath;

    private String          backgroundImagePath;

    @JsonBackReference
    @JoinColumn(name = "contentCategoryId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private ContentCategory contentCategory;

    @JsonBackReference
    @JoinColumn(name = "createUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User            createUser;
    private Date            createDate;
    @JsonBackReference
    @JoinColumn(name = "updateUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User            updateUser;
    private Date            updateDate;

}
