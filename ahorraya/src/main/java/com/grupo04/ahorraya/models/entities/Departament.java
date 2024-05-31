package com.grupo04.ahorraya.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "Departamento")
@NoArgsConstructor
public class Departament {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_departamento")
    private UUID idDepartamento;

    @Column(name = "nombre")
    private String name;

    @OneToMany(mappedBy = "departament")
    @JsonIgnore
    private List<Municipality> municipalities;

    @OneToMany(mappedBy = "departament")
    @JsonIgnore
    private List<Store> storesDepartament;

    public Departament(String name) {
        super();
        this.name = name;
    }
}
