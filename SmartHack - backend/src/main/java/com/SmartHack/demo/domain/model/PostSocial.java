package com.SmartHack.demo.domain.model;


import com.SmartHack.demo.domain.model.enums.SocialMediaEnum;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class PostSocial {

    private SocialMediaEnum socialMedia;
    private String link;
    private Integer initialClientsNumber;
}
