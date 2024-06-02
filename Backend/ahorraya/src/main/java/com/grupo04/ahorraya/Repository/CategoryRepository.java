package com.grupo04.ahorraya.Repository;

import com.grupo04.ahorraya.models.entities.Category;
import com.grupo04.ahorraya.models.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Category getByIdCategory(UUID idCategory);
    Category findByName(String name);
}
