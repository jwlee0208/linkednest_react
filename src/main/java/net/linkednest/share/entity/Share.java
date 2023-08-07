package net.linkednest.share.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.user.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "share")
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String shareName;
    private String shareType;
    private String introduce;
    @JsonBackReference
    @JoinColumn(name = "userNo")
    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "share", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<ShareBoardCategory> shareBoardCategoryList = new ArrayList<>();

    public void setShareBoardCategoryList(List<ShareBoardCategory> shareBoardCategoryList) {
        this.shareBoardCategoryList = shareBoardCategoryList;
        this.shareBoardCategoryList.forEach(o -> o.setShare(this));
    }

    private Date createDate;

}
