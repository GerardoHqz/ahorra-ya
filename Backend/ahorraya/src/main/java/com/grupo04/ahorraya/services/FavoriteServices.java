package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.FavoriteDTO;
import com.grupo04.ahorraya.models.entities.Store;

import java.util.List;
import java.util.UUID;

public interface FavoriteServices {
    public void addFavorite(UUID userId, UUID storeId) throws Exception;
    public void removeFavorite(UUID userId, UUID storeId) throws Exception;
    public List<Store> getFavorites(UUID userId);
}
