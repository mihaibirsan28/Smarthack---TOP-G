package com.SmartHack.demo.infra.jpa;


import com.SmartHack.demo.domain.model.enums.SocialMediaEnum;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity(name = "PostSocial")
@Table(name = "post_social")
public class PostSocialJPA extends BasicEntityJPA{

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
