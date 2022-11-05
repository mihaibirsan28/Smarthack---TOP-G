package com.SmartHack.demo.infra.jpa.mapper;


import com.SmartHack.demo.domain.model.Campaign;
import com.SmartHack.demo.infra.jpa.CampaignJPA;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        uses={
                PostSocialJPAMapper.class
        }
)
public interface CampaignJPAMapper extends GenericMapper<Campaign, CampaignJPA> {
}
