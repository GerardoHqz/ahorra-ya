package com.grupo04.ahorraya.models.dtos;

import com.grupo04.ahorraya.models.entities.Category;
import com.grupo04.ahorraya.models.entities.Offer;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OfferCategoryDTO {
    @NotNull(message = "La oferta es obligatoria")
    private Offer offerId;

    @NotNull(message = "La categoría es obligatoria")
    private Category categoryId;
}
