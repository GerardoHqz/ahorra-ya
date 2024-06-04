package com.grupo04.ahorraya.models.dtos;

import com.grupo04.ahorraya.models.entities.Departament;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MunicipalityDTO {
    @NotEmpty(message = "Municipality cant be empty")
    private String nameMunicipality;
    @NotEmpty(message = "Departament cant be empty")
    private Departament nameDepartament;
}
