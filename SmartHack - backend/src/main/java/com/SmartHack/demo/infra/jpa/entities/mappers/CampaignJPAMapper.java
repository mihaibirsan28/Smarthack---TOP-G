package com.SmartHack.demo.infra.jpa.entities.mappers;


import com.SmartHack.demo.domain.model.Campaign;
import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.infra.jpa.entities.CampaignJPA;
import com.SmartHack.demo.infra.jpa.entities.StoreJPA;
import com.SmartHack.demo.infra.jpa.entities.mappers.custom.ListToString;
import com.SmartHack.demo.infra.jpa.entities.mappers.custom.StringToList;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.StringTokenizer;

@Mapper(
        componentModel = "spring",
        uses={
                PostSocialJPAMapper.class
        }
)
public interface CampaignJPAMapper extends GenericMapper<Campaign, CampaignJPA> {

}
