package com.grupo04.ahorraya.services.servicesImpl;

import com.grupo04.ahorraya.Repository.CategoryRepository;
import com.grupo04.ahorraya.Repository.OfferRepository;
import com.grupo04.ahorraya.models.dtos.CategoryDTO;
import com.grupo04.ahorraya.models.entities.Category;
import com.grupo04.ahorraya.models.entities.Offer;
import com.grupo04.ahorraya.services.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryServicesimpl implements CategoryServices {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private OfferRepository offerRepository;

    @Override
    public void saveCategory(CategoryDTO info) throws Exception {
        try {
            Category category = new Category(info.getName());
            categoryRepository.save(category);
        } catch (Exception e) {
            throw new Exception("Error save category");
        }

    }

    @Override
    public void deleteCategory(UUID idCategory) throws Exception {
        try {
            categoryRepository.deleteById(idCategory);
        } catch (Exception e) {
            throw new Exception("Error delete category");
        }
    }

    @Override
    public void updateCategory(CategoryDTO info) throws Exception {
        try {
            Category category = new Category(info.getName());
            categoryRepository.save(category);
        } catch (Exception e) {
            throw new Exception("Error update category");
        }
    }

    @Override
    public Category getCategoryById(UUID idCategory) {
        return categoryRepository.getByIdCategory(idCategory);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    @Override
    public List<Offer> findOfferByIdCategory(UUID idCategory){

        return offerRepository.findAll().
                stream().filter(offer -> offer.getCategory().getIdCategory().equals(idCategory)).toList();
    }
    @Override
    public List<Offer> findOfferByActiveAndCategoryId(Boolean active, UUID idCategory){
        return offerRepository.findAll().
                stream().filter(offer -> offer.getActive().equals(active) && offer.getCategory().getIdCategory().equals(idCategory)).toList();
    }

}
