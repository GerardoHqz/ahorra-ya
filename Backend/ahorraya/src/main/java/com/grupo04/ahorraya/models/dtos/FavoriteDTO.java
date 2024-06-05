package com.grupo04.ahorraya.models.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Data
@NoArgsConstructor
public class FavoriteDTO {

    @NotNull(message = "El usuario es obligatorio")
    private UUID user;

    @NotNull(message = "La tienda es obligatoria")
    private UUID store;
}
