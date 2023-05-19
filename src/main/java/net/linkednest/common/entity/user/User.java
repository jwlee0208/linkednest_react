package net.linkednest.common.entity.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.common.entity.role.Authority;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user")
@ToString(exclude = {"userRoles", "refreshToken"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userNo;
    @Column(unique = true)
    private String userId;
    private String password;
    private String nickname;
    @Column(unique = true)
    private String email;
    @Column(columnDefinition = "TEXT")
    private String introduce;
    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Authority> userRoles = new ArrayList<>();

    public void setUserRoles(List<Authority> userRoles) {
        this.userRoles = userRoles;
        userRoles.forEach(o -> o.setUser(this));
    }

    @JsonManagedReference
    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private UserRefreshToken refreshToken;

    public void setRefreshToken(UserRefreshToken userRefreshToken) {
        this.refreshToken = userRefreshToken;
    }

    private Date createDate;

    private Date updateDate;

}