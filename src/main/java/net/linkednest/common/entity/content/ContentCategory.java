package net.linkednest.common.entity.content;


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
@Table(name="contentCategory")
public class ContentCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long   parentId;
    private String categoryCode;
    private String categoryName;
    private Integer depth;
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
