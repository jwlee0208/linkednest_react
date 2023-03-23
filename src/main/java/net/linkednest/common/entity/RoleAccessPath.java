package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Entity
@Data
@Table(name = "roleAccessPath")
public class RoleAccessPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;

    // 동적 권한 설정시 role에 대한 proxy 초기화 이슈로 FetchType을 EAGER(즉시) 로딩으로.
    // 이슈 발생시 해당 설정에 대한 확인 필요
    @JsonBackReference
    @JoinColumn(name = "role")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private Role role;
    private Date createDate;

    private Date updateDate;
}
