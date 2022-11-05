package com.SmartHack.demo.infra.jpa.mapper;

import com.SmartHack.demo.domain.model.SocialMedia;
import com.SmartHack.demo.infra.jpa.SocialMediaJPA;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        uses={
        }
)
public interface SocialMediaJPAMapper extends GenericMapper<SocialMedia, SocialMediaJPA> {

}
