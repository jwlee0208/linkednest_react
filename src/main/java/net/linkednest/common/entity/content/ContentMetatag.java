package net.linkednest.common.entity.content;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="contentMetatag")
public class ContentMetatag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @JoinColumn(name = "contentId")
    @OneToOne(fetch = FetchType.LAZY)
    private Content content;
    private String subject;
    private String title;
    private String description;
    private String author;
    private String publisher;
    private String location;
    private String distribution;
    private String copyright;
    private String robots;

    private String fbAppId;
    private String imageSrc;
    private String ogTitle;
    private String ogType;
    private String ogUrl;
    private String ogDescription;
    private String ogImage;
    private int ogImageWidth;
    private int ogImageHeight;

    private String twitterCard;
    private String twitterUrl;
    private String twitterTitle;
    private String twitterDescription;
    private String twitterImage;
    private String twitterSite;
    private String twitterCreator;
}

