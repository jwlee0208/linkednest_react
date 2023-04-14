package net.linkednest.common.entity.content;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Getter
@Setter
@Table(name="contentSns")
public class ContentSns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long    id;
    @JsonBackReference
    @JoinColumn(name = "contentId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Content content;
    private String  snsType;
    private String  snsUrl;
}
