package me.isetdsi.Ecommerce.api;


import me.isetdsi.Ecommerce.entity.ProductCategory;
import me.isetdsi.Ecommerce.entity.ProductInfo;
import me.isetdsi.Ecommerce.exception.MyException;
import me.isetdsi.Ecommerce.service.CategoryService;
import me.isetdsi.Ecommerce.service.ProductService;
import me.isetdsi.Ecommerce.vo.response.CategoryPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/category")

@CrossOrigin
public class CategoryController {
    @Autowired
    CategoryService categoryService;
    @Autowired
    ProductService productService;


    /**
     *
     * @param categoryType
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/{type}")
    public CategoryPage showOne(@PathVariable("type") Integer categoryType,
                                @RequestParam(value = "page", defaultValue = "1") Integer page,
                                @RequestParam(value = "size", defaultValue = "3") Integer size) {

        ProductCategory cat = categoryService.findByCategoryType(categoryType);
        PageRequest request = PageRequest.of(page - 1, size);
        Page<ProductInfo> productInCategory = productService.findAllInCategory(categoryType, request);
        var tmp = new CategoryPage("", productInCategory);
        tmp.setCategory(cat.getCategoryName());
        return tmp;
    }
    @DeleteMapping("/delete/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer categoryId) {
        try {
            categoryService.delete(categoryId);
            return ResponseEntity.ok("Category deleted successfully.");
        } catch (MyException ex) {
            // Retourne un message propre au front
            return ResponseEntity
                    .status(400)
                    .body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body("Unexpected error while deleting category");
        }
    }


    @GetMapping("/all")
    public List<ProductCategory> getAll() {
        return categoryService.findAll();
    }
 //   @GetMapping("/{type}")
  //  public ProductCategory getOne(@PathVariable Integer type) {
    //    return categoryService.findByCategoryType(type);
 //   }
    @PostMapping("/add")
    public ProductCategory add(@RequestBody ProductCategory category) {
        return categoryService.save(category);
    }
}
