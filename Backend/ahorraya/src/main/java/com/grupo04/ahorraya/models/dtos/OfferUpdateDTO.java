package com.grupo04.ahorraya.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class OfferUpdateDTO {
    @NotNull(message = "El id de la oferta es obligatorio")
    private UUID idOffer;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no debe superar los 100 caracteres")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(max = 255, message = "La descripción no debe superar los 255 caracteres")
    private String description;

    @NotNull(message = "El precio anterior es obligatorio")
    @Positive(message = "El precio anterior debe ser positivo")
    private Float priceBefore;

    @NotNull(message = "El precio actual es obligatorio")
    @Positive(message = "El precio actual debe ser positivo")
    private Float priceNow;

    @NotBlank(message = "La fecha de inicio es obligatoria")
    private String initDate;

    @NotBlank(message = "La fecha de fin es obligatoria")
    private String endDate;

    @NotNull(message = "El estado activo es obligatorio")
    private Boolean active;

    @NotNull(message = "La categoria es obligatoria")
    private UUID category;

    @NotNull(message = "La tienda es obligatoria")
    private UUID store;
}
