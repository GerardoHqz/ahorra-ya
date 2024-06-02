package com.grupo04.ahorraya.models.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartamentDTO {
    @NotEmpty(message = "Departament cant be empty")
    private String departamentName;
}
