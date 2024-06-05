package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.FavoriteRepository;
import com.grupo04.ahorraya.Repository.StoreRepository;
import com.grupo04.ahorraya.Repository.UserRepository;
import com.grupo04.ahorraya.models.dtos.FavoriteDTO;
import com.grupo04.ahorraya.models.entities.Favorite;
import com.grupo04.ahorraya.models.entities.Store;
import com.grupo04.ahorraya.models.entities.User;
import com.grupo04.ahorraya.services.FavoriteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FavoriteServicesImpl implements FavoriteServices {

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StoreRepository storeRepository;

    @Override
    public void addFavorite(FavoriteDTO info) {
        User user = userRepository.findByIdUser(info.getUser());
        Store store = storeRepository.findByIdStore(info.getStore());
        Favorite favorite = new Favorite(user, store);
        favoriteRepository.save(favorite);
    }

    @Override
    public void removeFavorite(UUID idFavorite) {
        favoriteRepository.deleteById(idFavorite);
    }

    @Override
    public List<Store> getFavorites(UUID userId) {
        return favoriteRepository.findAll().stream().map(favorite -> {
            if (favorite.getUser().getIdUser().equals(userId)) {
                return favorite.getStore();
            }
            return null;
        }).toList();
    }
}
