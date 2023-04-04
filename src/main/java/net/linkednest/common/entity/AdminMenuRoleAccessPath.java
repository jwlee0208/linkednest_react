package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "adminMenuRoleAccessPath")
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

    private Boolean isViewAdminMenuList;
    private Date createDate;

    private Date updateDate;

    public void setAdminMenuCategory(AdminMenuCategory adminMenuCategory) {
        this.adminMenuCategory = adminMenuCategory;
    }

    @JsonBackReference
    @JoinColumn(name = "adminMenuCategoryId")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private AdminMenuCategory adminMenuCategory;


}
