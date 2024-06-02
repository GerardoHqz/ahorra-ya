package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StoreRepository extends JpaRepository<Store, UUID> {
    Store findByName(String name);
    Store getByIdStore(UUID id);
}
