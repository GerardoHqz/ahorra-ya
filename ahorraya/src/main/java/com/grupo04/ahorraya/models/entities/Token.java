package com.grupo04.ahorraya.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_token")
    private UUID IdToken;

    @Column(name = "token")
    private String token;

    @Column(name = "fecha_creación",insertable = false, updatable = false)
    private Date creationDate;

    @Column(name = "activo", insertable = false)
    private Boolean active;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User user;

    public Token(String content, User user) {
        super();
        this.token = content;
        this.user = user;
    }
}
