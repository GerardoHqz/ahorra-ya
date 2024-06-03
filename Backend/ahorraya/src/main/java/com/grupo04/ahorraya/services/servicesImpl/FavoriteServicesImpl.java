package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.FavoriteRepository;
import com.grupo04.ahorraya.models.dtos.FavoriteDTO;
import com.grupo04.ahorraya.models.entities.Favorite;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.services.FavoriteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FavoriteServicesImpl implements FavoriteServices {

    @Autowired
    FavoriteRepository favoriteRepository;

    @Override
    public void addFavorite(FavoriteDTO info) throws Exception {
        try{
            Favorite favorite = new Favorite(info.getUser(), info.getStore());
            favoriteRepository.save(favorite);
        } catch (Exception e) {
            throw new Exception("Error to add favorite!");
        }
    }

    @Override
    public void removeFavorite(FavoriteDTO info) throws Exception{
        try{
            Favorite favorite = new Favorite(info.getUser(), info.getStore());
            favoriteRepository.delete(favorite);
        } catch (Exception e) {
            throw new Exception("Error to remove favorite!");
        }
    }

    @Override
    public List<Store> getFavorites(UUID userId) {
        List<Store> favorites = favoriteRepository.findAll().stream()
                .filter(favorite -> favorite.getUser().getIdUser().equals(userId)).map(Favorite::getStore).toList();
        return favorites;
    }
}
