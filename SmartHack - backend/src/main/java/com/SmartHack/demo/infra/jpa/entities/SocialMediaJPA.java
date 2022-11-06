package com.SmartHack.demo.infra.jpa.entities;

import com.SmartHack.demo.domain.model.enums.SocialMediaEnum;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity(name = "SocialMedia")
@Table(name = "social_media")
public class SocialMediaJPA extends BasicEntityJPA
{

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private SocialMediaEnum name;

    @Column(name = "link")
    private String link;

    @ManyToOne
    @JoinColumn(name ="store_id")
    private StoreJPA storeId;


}
