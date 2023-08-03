package net.linkednest.share.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.user.User;

import java.util.Date;

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
    private Date createDate;
    
}
