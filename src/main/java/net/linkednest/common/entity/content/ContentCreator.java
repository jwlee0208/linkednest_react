package net.linkednest.common.entity.content;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

@Entity
@Getter
@Setter
@Table(name = "contentCreator")
public class ContentCreator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String createrName;
    private String createrRights;
    private String createrImgUrl;

}
