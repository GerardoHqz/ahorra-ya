package com.grupo04.ahorraya.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Oferta_Categoria")
public class Offer_Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_oferta_categoria", updatable = false, nullable = false)
    private UUID idFavorite;

    @ManyToOne
    @JoinColumn(name = "id_oferta", nullable = false)
    private Offer offer;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Category category;

    public Offer_Category(Offer offer, Category category) {
        super();
        this.offer = offer;
        this.category = category;
    }
}
