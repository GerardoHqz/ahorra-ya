package com.grupo04.ahorraya.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Favorito")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_favorito", updatable = false, nullable = false)
    private UUID idFavorite;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user", nullable = true)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_tienda", nullable = true)
    private Store store;

    public Favorite(User user, Store store) {
        super();
        this.user = user;
        this.store = store;
    }
}

