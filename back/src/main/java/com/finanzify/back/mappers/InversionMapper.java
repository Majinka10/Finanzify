package com.finanzify.back.mappers;

import com.finanzify.back.dto.InversionDTO;
import com.finanzify.back.model.Inversion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InversionMapper {

    InversionMapper INSTANCE = Mappers.getMapper(InversionMapper.class);

    @Mapping(source = "tipo.nombre", target = "tipo")
    InversionDTO inversionToInversionDto(Inversion inversion);
}
