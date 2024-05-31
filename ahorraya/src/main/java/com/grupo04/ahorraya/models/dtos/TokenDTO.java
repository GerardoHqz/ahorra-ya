package com.grupo04.ahorraya.models.dtos;

import com.grupo04.ahorraya.models.entities.Token;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TokenDTO {
    private String token;

    public TokenDTO(Token token) {
        this.token = token.getToken();
    }
}
