package com.finanzify.back.mappers;

import com.finanzify.back.dto.TipoDTO;
import com.finanzify.back.dto.UserDTO;
import com.finanzify.back.model.Usuario;
import com.finanzify.back.model.tipo_egreso;
import com.finanzify.back.model.tipo_ingreso;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TipoMapper {

    TipoMapper INSTANCE = Mappers.getMapper(TipoMapper.class);

    TipoDTO tipoEgresoToTipoDto(tipo_egreso tipo);

    TipoDTO tipoIngresoToTipoDto(tipo_ingreso tipo);
}
