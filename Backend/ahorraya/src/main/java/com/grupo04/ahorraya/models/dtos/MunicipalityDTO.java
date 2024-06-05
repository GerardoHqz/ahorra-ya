package com.grupo04.ahorraya.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MunicipalityDTO {
    @NotBlank(message = "Municipality cant be empty")
    private String nameMunicipality;
    @NotNull(message = "Departament cant be empty")
    private UUID departament;
}
