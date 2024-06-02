package com.grupo04.ahorraya.models.dtos;

import com.grupo04.ahorraya.models.entities.Departament;
import com.grupo04.ahorraya.models.entities.Municipality;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreDTO {
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no debe superar los 100 caracteres")
    private String name;

    @Size(max = 255, message = "La descripción no debe superar los 255 caracteres")
    private String description;

    @NotNull(message = "La latitud es obligatoria")
    @DecimalMin(value = "-90.0", inclusive = true, message = "La latitud debe ser mayor o igual a -90.0")
    @DecimalMax(value = "90.0", inclusive = true, message = "La latitud debe ser menor o igual a 90.0")
    private Double latitude;

    @NotNull(message = "La longitud es obligatoria")
    @DecimalMin(value = "-180.0", inclusive = true, message = "La longitud debe ser mayor o igual a -180.0")
    @DecimalMax(value = "180.0", inclusive = true, message = "La longitud debe ser menor o igual a 180.0")
    private Double longitude;

    @NotNull(message = "El departamento es obligatorio")
    private Departament departament;

    @NotNull(message = "El municipio es obligatorio")
    private Municipality municipality;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 255, message = "La dirección no debe superar los 255 caracteres")
    private String direction;

    @Size(max = 100, message = "El nombre del propietario no debe superar los 100 caracteres")
    private String ownerName;

    @Size(max = 255, message = "El sitio web no debe superar los 255 caracteres")
    private String webSite;

    @Size(max = 20, message = "El teléfono no debe superar los 20 caracteres")
    private String phone;

    @Email(message = "El correo electrónico debe ser válido")
    @Size(max = 60, message = "El correo electrónico no debe superar los 60 caracteres")
    private String email;
}
