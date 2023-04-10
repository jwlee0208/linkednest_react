package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "adminMenu")
@ToString(exclude = {"adminMenuRoleAccessPaths", "adminMenuCategory", "updateUser", "createUser"})
public class AdminMenu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @JsonBackReference
    @JoinColumn(name = "categoryId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private AdminMenuCategory adminMenuCategory;
    private String menuName;
    private String menuUrl;

    @Column(columnDefinition = "boolean default false")
    private Boolean isShow;    // admin menu list에 보여져야 할 내용인지 아닌지

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;   // 메뉴 활성화 여부

    @JsonManagedReference
    @OneToMany(mappedBy = "adminMenu", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<AdminMenuRoleAccessPath> adminMenuRoleAccessPaths = new ArrayList<>();

    public void setAdminMenuRoleAccessPaths(List<AdminMenuRoleAccessPath> adminMenuRoleAccessPath) {
        this.adminMenuRoleAccessPaths = adminMenuRoleAccessPath;
        adminMenuRoleAccessPath.stream().forEach(o -> o.setAdminMenu(this));
    }

    private Date createDate;

    @JsonBackReference
    @JoinColumn(name = "createUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User createUser;

    private Date updateDate;

    @JsonBackReference
    @JoinColumn(name = "updateUserNo")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User updateUser;

}

