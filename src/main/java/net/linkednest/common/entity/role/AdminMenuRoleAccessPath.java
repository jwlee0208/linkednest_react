package net.linkednest.common.entity.role;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.linkednest.common.entity.menu.AdminMenu;
import net.linkednest.common.entity.user.User;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "adminMenuRoleAccessPath")
@ToString(exclude = {"role", "adminMenu", "updateUser", "createUser"})
public class AdminMenuRoleAccessPath {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @JsonBackReference
    @JoinColumn(name = "adminMenuId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private AdminMenu adminMenu;

    @JsonBackReference
    @JoinColumn(name = "roleId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Role role;

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
