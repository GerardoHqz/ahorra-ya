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

    private String name;

    private String url;

    private UUID store;

    private UUID offer;
}
