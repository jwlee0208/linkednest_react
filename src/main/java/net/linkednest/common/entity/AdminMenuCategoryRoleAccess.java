package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Data
@Entity
@Table(name = "adminMenuCategoryRoleAccess")

public class AdminMenuCategoryRoleAccess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;


    @JsonBackReference
    @JoinColumn(name = "adminMenuCategoryId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private AdminMenuCategory adminMenuCategory;

    public void setAdminMenuCategory(AdminMenuCategory adminMenuCategory) {
        this.adminMenuCategory = adminMenuCategory;
    }

    @JsonBackReference
    @JoinColumn(name = "roleId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Role role;


    public void setRole(Role role) {
        this.role = role;
    }

}
