package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Getter
@Setter
@Entity
@Table(name = "userRefreshToken")
public class UserRefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @JsonBackReference
    @JoinColumn(name = "user")
    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    @Column(unique = true)
    private String refreshToken;

}
