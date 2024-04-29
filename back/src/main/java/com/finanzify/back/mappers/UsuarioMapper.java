package com.finanzify.back.mappers;


import com.finanzify.back.dto.UserDTO;
import com.finanzify.back.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UsuarioMapper {

    UsuarioMapper INSTANCE = Mappers.getMapper(UsuarioMapper.class);

    UserDTO usuarioToUsuarioDTO(Usuario usuario);
}
