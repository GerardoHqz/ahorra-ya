package com.grupo04.ahorraya.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Municipio")
public class Municipality {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_municipio")
    private UUID idMunicipality;

    @Column(name = "nombre")
    private String name;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departament departament;

    public Municipality(String name, Departament departament) {
        super();
        this.name = name;
        this.departament = departament;
    }
}

