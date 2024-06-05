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

    @Column(name = "nombre")
    private String name;

    @Column(name = "url")
    private String url;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tienda")
    private Store store;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_oferta")
    private Offer offer;

    public Image(String name, String url, Store store, Offer offer) {
        super();
        this.name = name;
        this.url = url;
        this.store = store;
        this.offer = offer;
    }
}
