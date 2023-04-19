package net.linkednest.common.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ResBanner {
    private Long id;
    private Long contentId;
    private String bannerName;
    private String bannerDesc;
    private String mainImageUrl;
    private String midImageUrl;
    private String etcImageUrl;
    private Boolean isActive;
    private Date fromShowDate;
    private Date toShowDate;
}
