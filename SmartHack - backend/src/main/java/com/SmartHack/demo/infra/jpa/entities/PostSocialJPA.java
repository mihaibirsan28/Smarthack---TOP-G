package com.SmartHack.demo.infra.jpa.entities;


import com.SmartHack.demo.domain.model.enums.SocialMediaEnum;
import com.SmartHack.demo.infra.jpa.entities.BasicEntityJPA;
import com.SmartHack.demo.infra.jpa.entities.CampaignJPA;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity(name = "PostSocial")
@Table(name = "post_social")
public class PostSocialJPA extends BasicEntityJPA {

    @Column(name = "social_media")
    @Enumerated(EnumType.STRING)
    private SocialMediaEnum socialMedia;

    @Column(name = "link")
    private String link;

    @Column(name = "initial_clients_number")
    private Integer initialClientsNumber;

    @ManyToOne
    @JoinColumn(name ="campaign_id")
    private CampaignJPA campaignId;
}
