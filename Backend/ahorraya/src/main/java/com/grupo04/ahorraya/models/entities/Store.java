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
@Table(name = "Tienda")
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_tienda")
    private UUID idStore;

    @Column(name = "nombre", length = 100)
    private String name;

    @Column(name = "descripcion", length = 255)
    private String description;

    @Column(name = "latitud")
    private Double latitude;

    @Column(name = "longuitud")
    private Double longuitude;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    private Departament departament;

    @ManyToOne
    @JoinColumn(name = "id_municipio")
    private Municipality municipality;

    @Column(name = "direccion", nullable = false, length = 255)
    private String direction;

    @Column(name = "nombre_propietario", length = 100)
    private String ownerName;

    @Column(name = "sitio_web", length = 255)
    private String webSite;

    @Column(name = "telefono", length = 20)
    private String phone;

    @Column(name = "correo_electronico", length = 60)
    private String email;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Offer> offers;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "store", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Image> images;



    public Store(String name, String description, Double latitude, Double longuitude , Departament departament,
                 Municipality municipality, String direction, String ownerName, String webSite, String phone, String email) {
        super();
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longuitude = longuitude;
        this.departament = departament;
        this.municipality = municipality;
        this.direction = direction;
        this.ownerName = ownerName;
        this.webSite = webSite;
        this.phone = phone;
        this.email = email;
    }
}
