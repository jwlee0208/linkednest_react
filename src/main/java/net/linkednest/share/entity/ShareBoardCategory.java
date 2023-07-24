package net.linkednest.share.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.user.User;

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

}
