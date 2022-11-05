package com.SmartHack.demo.infra.jpa;

import lombok.*;
import org.springframework.context.annotation.ComponentScan;

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
@Entity(name = "Store")
@Table(name = "store")
public class StoreJPA extends BasicEntityJPA{

    @Column(name  = "name")
    private String name;

    @Column(name = "location")
    private String location;


    @OneToMany(mappedBy = "storeId")
    private Set<SocialMediaJPA> socialMedia = new HashSet<>();


}
