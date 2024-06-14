package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Favorite;
import com.grupo04.ahorraya.models.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {
}