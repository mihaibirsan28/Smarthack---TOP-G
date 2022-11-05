package com.SmartHack.demo.domain.model;


import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Campaign  {

    private String name;
    private LocalDate releaseDate;
    private Set<PostSocial> postsSocial = new HashSet<>();

}
