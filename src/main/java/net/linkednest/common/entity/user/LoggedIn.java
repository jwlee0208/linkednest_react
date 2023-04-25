package net.linkednest.common.entity.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.linkednest.common.entity.content.Content;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "loggedIn")
public class LoggedIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    @JsonBackReference
    @JoinColumn(name = "userNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;
    @JsonBackReference
    @JoinColumn(name = "contentId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Content content;
    private String ipAddr;
    private String actionType;  // login, logout
    private Date actionDate;
}
