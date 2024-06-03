package com.grupo04.ahorraya.models.dtos;

import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.models.entities.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class FavoriteDTO {

    @NotNull(message = "El usuario es obligatorio")
    private User user;

    @NotNull(message = "La tienda es obligatoria")
    private Store store;
}
