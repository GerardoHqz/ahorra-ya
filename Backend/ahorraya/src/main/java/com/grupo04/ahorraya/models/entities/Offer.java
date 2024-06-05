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
@Table(name = "Oferta")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_oferta")
    private UUID idOffer;

    @Column(name = "nombre")
    private String name;

    @Column(name = "descripcion")
    private String description;

    @Column(name = "precio_anterior")
    private Float priceBefore;

    @Column(name = "precio_actual")
    private Float priceNow;

    @Column(name = "fecha_inicio")
    private String initDate;

    @Column(name = "fecha_fin")
    private String endDate;

    @Column(name = "activo")
    private Boolean active = true;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tienda")
    private Store store;

    @OneToMany(mappedBy = "offer", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Image> images;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_categoria")
    private Category category;


    public Offer(String name, String description, Float priceBefore, Float priceNow, String initDate, String endDate,
                 Boolean active, Store store, Category category) {
        super();
        this.name = name;
        this.description = description;
        this.priceBefore = priceBefore;
        this.priceNow = priceNow;
        this.initDate = initDate;
        this.endDate = endDate;
        this.active = active;
        this.store = store;
        this.category = category;
    }
}

