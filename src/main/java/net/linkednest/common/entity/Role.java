package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "role")
@ToString(exclude = {"accessPaths", "adminMenuCategoryRoleAccesses"})
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private String roleName;

    private String roleDescription;

    private Date createDate;

    @JsonManagedReference
    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<RoleAccessPath> accessPaths;

    public void setAccessPaths(List<RoleAccessPath> roleAccessPaths) {
        this.accessPaths = roleAccessPaths;
        roleAccessPaths.stream().forEach(o -> o.setRole(this));
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<AdminMenuCategoryRoleAccess> adminMenuCategoryRoleAccesses;

    public void setAdminMenuCategoryRoleAccesses(List<AdminMenuCategoryRoleAccess> adminMenuCategoryRoleAccesses) {
        this.adminMenuCategoryRoleAccesses = adminMenuCategoryRoleAccesses;
        adminMenuCategoryRoleAccesses.stream().forEach(o -> o.setRole(this));
    }
}
