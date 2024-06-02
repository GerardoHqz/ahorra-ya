package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Departament;
import com.grupo04.ahorraya.models.entities.Municipality;
import com.grupo04.ahorraya.models.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StoreRepository extends JpaRepository<Store, UUID> {
    Store findByName(String name);
    Store getByIdStore(UUID id);
    List<Store> findAllByDepartament(Departament departament);
    List<Store> findAllByMunicipality(Municipality municipality);
}
