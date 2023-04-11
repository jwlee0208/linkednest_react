package net.linkednest.common.dto.user.signup;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ResUserProfileDto {

    private String birthday;
    private String sex;
    private String phoneNo;
    private String additionalPhoneNo;
    private String address;
    private String detailAddress;
    private Integer zipcode;


}
