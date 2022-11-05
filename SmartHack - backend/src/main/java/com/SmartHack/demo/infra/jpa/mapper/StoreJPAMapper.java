package com.SmartHack.demo.infra.jpa.mapper;

import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.infra.jpa.StoreJPA;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(
        componentModel = "spring",
        uses={
                SocialMediaJPAMapper.class
        }
)
public interface StoreJPAMapper extends GenericMapper<Store, StoreJPA> {


}
