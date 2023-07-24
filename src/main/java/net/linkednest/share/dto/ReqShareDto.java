package net.linkednest.share.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ReqShareDto {
    private Long id;
    private String shareName;
    private String shareType;
    private String introduce;
    private Long userNo;
    private Date createDate;
}
