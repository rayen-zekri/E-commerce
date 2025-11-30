package me.isetdsi.Ecommerce.service.impl;


import me.isetdsi.Ecommerce.entity.ProductCategory;
import me.isetdsi.Ecommerce.enums.ResultEnum;
import me.isetdsi.Ecommerce.exception.MyException;
import me.isetdsi.Ecommerce.repository.ProductCategoryRepository;
import me.isetdsi.Ecommerce.repository.ProductInfoRepository;
import me.isetdsi.Ecommerce.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductInfoRepository productRepository;

    @Override
    public List<ProductCategory> findAll() {
        List<ProductCategory> res = productCategoryRepository.findAllByOrderByCategoryType();
      //  res.sort(Comparator.comparing(ProductCategory::getCategoryType));
        return res;
    }

    @Override
    public ProductCategory findByCategoryType(Integer categoryType) {
        ProductCategory res = productCategoryRepository.findByCategoryType(categoryType);
        if(res == null) throw new MyException(ResultEnum.CATEGORY_NOT_FOUND);
        return res;
    }

    @Override
    public List<ProductCategory> findByCategoryTypeIn(List<Integer> categoryTypeList) {
        List<ProductCategory> res = productCategoryRepository.findByCategoryTypeInOrderByCategoryTypeAsc(categoryTypeList);
       //res.sort(Comparator.comparing(ProductCategory::getCategoryType));
        return res;
    }
    @Override
    @Transactional
    public void delete(Integer categoryId) {
        // 1. Vérifier si la catégorie existe
        ProductCategory category = productCategoryRepository.findById(categoryId)
                .orElseThrow(() ->  new MyException(ResultEnum.CATEGORY_NOT_FOUND));


        // 2. Vérifier si des produits utilisent cette catégorie
        Long count = productRepository.countByCategoryType(category.getCategoryType());

        if (count > 0) {
            throw new MyException(ResultEnum.CATEGORY_USED_BY_PRODUCTS);
        }

        productCategoryRepository.delete(category);
    }


    @Override
    @Transactional
    public ProductCategory save(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }



}
