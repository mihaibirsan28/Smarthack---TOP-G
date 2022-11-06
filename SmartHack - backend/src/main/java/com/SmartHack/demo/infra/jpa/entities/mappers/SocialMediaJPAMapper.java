package com.SmartHack.demo.infra.jpa.entities.mappers;

import com.SmartHack.demo.domain.model.SocialMedia;
import com.SmartHack.demo.infra.jpa.entities.SocialMediaJPA;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        uses={
        }
)
public interface SocialMediaJPAMapper extends GenericMapper<SocialMedia, SocialMediaJPA> {

}
