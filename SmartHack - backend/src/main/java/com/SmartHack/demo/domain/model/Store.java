package com.SmartHack.demo.domain.model;

import com.SmartHack.demo.infra.jpa.BasicEntityJPA;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
