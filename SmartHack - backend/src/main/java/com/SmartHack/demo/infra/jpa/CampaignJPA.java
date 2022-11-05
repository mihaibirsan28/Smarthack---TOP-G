package com.SmartHack.demo.infra.jpa;


import com.SmartHack.demo.domain.model.enums.SocialMediaEnum;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity(name = "Campaign")
@Table(name = "campaign")
public class CampaignJPA extends BasicEntityJPA{

    @Column(name = "name")
    private String name;

    @Column(name ="release_date")
    private LocalDate releaseDate;


    @Column(name = "post")
    @OneToMany(mappedBy = "campaignId")
    private Set<PostSocialJPA> postsSocial = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "campaign_store",
            joinColumns = @JoinColumn(name = "campaign_id"),
            inverseJoinColumns = @JoinColumn(name = "store_id"))
    Set<StoreJPA> stores = new HashSet<>();
}
