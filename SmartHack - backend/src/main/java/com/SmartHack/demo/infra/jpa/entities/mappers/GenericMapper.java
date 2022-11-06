package com.SmartHack.demo.infra.jpa.entities.mappers;

public interface GenericMapper<Domain,DTO> {

    DTO toDto(Domain domain);

    Domain toDomain(DTO dto);

}
