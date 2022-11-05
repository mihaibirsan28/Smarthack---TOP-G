package com.SmartHack.demo.infra.jpa.mapper;

public interface GenericMapper<Domain,DTO> {

    DTO toDto(Domain domain);

    Domain toDomain(DTO dto);

}
