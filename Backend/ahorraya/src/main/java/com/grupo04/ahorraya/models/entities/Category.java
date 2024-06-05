package com.grupo04.ahorraya.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Categoria")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_categoria", updatable = false, nullable = false)
    private UUID idCategory;

    @Column(name = "nombre", nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "category" , fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Offer> offers;

    public Category(String name) {
        super();
        this.name = name;
    }
}


