package com.SmartHack.demo.infra.jpa.mapper;

import com.SmartHack.demo.domain.model.Store;
import com.SmartHack.demo.infra.jpa.StoreJPA;
import com.SmartHack.demo.infra.jpa.mapper.converter.CordinatesConvertorUtil;
import com.SmartHack.demo.infra.jpa.mapper.converter.CordinatesToString;
import com.SmartHack.demo.infra.jpa.mapper.converter.StringToCordinates;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(
        componentModel = "spring",
        uses={
                SocialMediaJPAMapper.class,
                CordinatesConvertorUtil.class
        }
)
public interface StoreJPAMapper extends GenericMapper<Store, StoreJPA> {

        @Override
        @Mapping(source = "coordinates" , target = "coordinates" , qualifiedBy = CordinatesToString.class)
        Store toDomain(StoreJPA storeJPA);

        @Override
        @Mapping(source = "coordinates" , target = "coordinates" , qualifiedBy = StringToCordinates.class)
        StoreJPA toDto(Store Store);

}
