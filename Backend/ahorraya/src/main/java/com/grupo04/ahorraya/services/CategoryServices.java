package com.grupo04.ahorraya.services;

import com.grupo04.ahorraya.models.dtos.CategoryDTO;
import com.grupo04.ahorraya.models.entities.Category;
import com.grupo04.ahorraya.models.entities.Offer;

import java.util.List;
import java.util.UUID;

public interface CategoryServices {
    void saveCategory(CategoryDTO info) throws Exception;

    void deleteCategory(UUID idCategory) throws Exception;

    void updateCategory(CategoryDTO info) throws Exception;

    Category getCategoryById(UUID idCategory);

    List<Category> getAllCategories();

    List<Offer> findOfferByIdCategory(UUID idCategory);

    List<Offer> findOfferByActiveAndCategoryId(Boolean active, UUID idCategory);
}
