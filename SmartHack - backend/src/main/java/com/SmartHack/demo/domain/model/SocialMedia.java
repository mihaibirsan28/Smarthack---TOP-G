package com.SmartHack.demo.domain.model;

import com.SmartHack.demo.domain.model.enums.SocialMediaEnum;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class SocialMedia
{

    private  String id;
    private SocialMediaEnum name;
    private String link;;

}
