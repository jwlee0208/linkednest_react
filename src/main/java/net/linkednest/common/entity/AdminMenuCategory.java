package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "adminMenuCategory")
public class AdminMenuCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private String categoryName;

    private Date createDate;

    @JsonBackReference
    @JoinColumn(name = "createUser")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User createUser;

    private Date updateDate;

    @JsonBackReference
    @JoinColumn(name = "updateUser")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User updateUser;

    private Boolean isActive;

    @JsonManagedReference
    @OneToMany(mappedBy = "adminMenuCategory", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<AdminMenu> menus = new ArrayList<>();

    public void setMenus(List<AdminMenu> menu) {
        this.menus = menu;
        menu.stream().forEach(o -> o.setAdminMenuCategory(this));
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "adminMenuCategory", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<AdminMenuRoleAccessPath> adminMenuRoleAccessPaths = new ArrayList<>();

    public void setAdminMenuRoleAccessPaths(List<AdminMenuRoleAccessPath> adminMenuRoleAccessPaths) {
        this.adminMenuRoleAccessPaths = adminMenuRoleAccessPaths;
        adminMenuRoleAccessPaths.stream().forEach(o -> o.setAdminMenuCategory(this));
    }
}
