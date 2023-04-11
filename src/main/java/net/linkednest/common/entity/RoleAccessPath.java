package net.linkednest.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "roleAccessPath")
@ToString(exclude = {"role"})
public class RoleAccessPath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;

    // backend, front 구분
    private String type;

    // 유저가 사용할 수 있는 action에 대한 구분
    private String httpMethod;

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
