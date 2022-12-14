package com.SmartHack.demo.infra.jpa.entities;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity(name = "Store")
@Table(name = "store")
public class StoreJPA extends BasicEntityJPA {

    @Column(name  = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "storeId")
    private Set<SocialMediaJPA> socialMedia = new HashSet<>();

    @ManyToMany(mappedBy = "stores")
    private Set<CampaignJPA> campaigns = new HashSet<>();


}
