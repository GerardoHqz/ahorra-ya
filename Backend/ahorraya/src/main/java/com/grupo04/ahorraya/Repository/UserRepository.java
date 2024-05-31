package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByUsername(String email);
}
