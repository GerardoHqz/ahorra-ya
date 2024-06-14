package com.grupo04.ahorraya.models.dtos;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailDTO {
	@NotNull(message = "El email es obligatorio")
    private String email;

}
