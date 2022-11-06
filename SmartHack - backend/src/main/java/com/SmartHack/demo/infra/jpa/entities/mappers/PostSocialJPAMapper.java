package com.SmartHack.demo.infra.jpa.entities.mappers;

import com.SmartHack.demo.domain.model.PostSocial;
import com.SmartHack.demo.infra.jpa.entities.PostSocialJPA;
import org.mapstruct.Mapper;

@Mapper(
        componentModel = "spring",
        uses={
        }
)
public interface PostSocialJPAMapper extends GenericMapper<PostSocial, PostSocialJPA> {
}
