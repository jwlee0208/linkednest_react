package net.linkednest.share.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.user.User;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="shareBoardCategory")
public class ShareBoardCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long    id;
    private String  boardCategoryName;
    @JsonBackReference
    @JoinColumn(name = "createUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private String  createDate;

    @JsonBackReference
    @JoinColumn(name = "shareId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Share share;
    @JsonManagedReference
    @OneToMany(mappedBy = "shareBoardCategory", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<ShareBoard> shareBoardList = new ArrayList<>();

    public void setShareBoardList(List<ShareBoard> shareBoardList) {
        this.shareBoardList = shareBoardList;
        shareBoardList.forEach(o -> o.setShareBoardCategory(this));
    }
}
