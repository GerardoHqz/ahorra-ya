package com.grupo04.ahorraya.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Imagen")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_imagen")
    private UUID idImage;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "id_tienda")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "id_oferta")
    private Offer offer;

    public Image(String url, Store store, Offer offer) {
        super();
        this.url = url;
        this.store = store;
        this.offer = offer;
    }
}
