package com.SmartHack.demo.infra.jpa.entities.mappers;

import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.infra.jpa.entities.StoreJPA;

import org.mapstruct.Mapper;


@Mapper(
        componentModel = "spring",
        uses={
                SocialMediaJPAMapper.class
        }
)
public interface StoresJPAMapper extends GenericMapper<Store, StoreJPA> {


}
