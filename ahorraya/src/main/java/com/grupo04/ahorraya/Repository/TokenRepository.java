package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Token;
import com.grupo04.ahorraya.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TokenRepository extends JpaRepository<Token, UUID> {
    List<Token> findByUserAndActive(User user, Boolean active);
}
