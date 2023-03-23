package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Data
@Entity
@Table(name = "authority")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @JsonBackReference
    @JoinColumn(name = "user")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    @JsonBackReference
    @JoinColumn(name = "role")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Role role;

    public void setUser(User user) {
        this.user = user;
    }

    public void setRole(Role role) { this.role = role; }
}