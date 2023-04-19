package net.linkednest.common.entity.banner;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.content.Content;
import net.linkednest.common.entity.user.User;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name="banner")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @JoinColumn(name = "contentNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Content content;
    private String bannerName;
    private String bannerDesc;
    private String mainImageUrl;
    private String midImageUrl;
    private String etcImageUrl;
    private Boolean isActive;
    private Date fromShowDate;
    private Date toShowDate;
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
