package com.grupo04.ahorraya.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class ImageUpdateDTO {

    @NotNull(message = "El id de la imagen es obligatorio")
    private UUID idImage;

    @NotBlank(message = "El name es obligatorio")
    private String name;

    @NotBlank(message = "El url es obligatorio")
    private String url;

    @NotNull(message = "La store es obligatoria")
    private UUID store;

    @NotNull(message = "La offer es obligatoria")
    private UUID offer;
}
