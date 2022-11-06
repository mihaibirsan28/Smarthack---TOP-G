package com.SmartHack.demo.domain.model;

import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Store {

    private String id;
    private String name;
    private String location;
    private Set<SocialMedia> socialMedia = new HashSet<>();

}
