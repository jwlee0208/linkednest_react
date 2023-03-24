package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Getter
@Setter
@Table(name = "adminMenu")
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
}
