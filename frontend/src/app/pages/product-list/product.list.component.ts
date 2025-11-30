import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ProductService } from "../../services/product.service";
import { JwtResponse } from "../../response/JwtResponse";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { CategoryType } from "../../enum/CategoryType";
import { ProductStatus } from "../../enum/ProductStatus";
import { ProductInfo } from "../../models/productInfo";
import { Role } from "../../enum/Role";
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.list.component.html',
  styleUrls: ['./product.list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  Role = Role;
  CategoryType = CategoryType;
  ProductStatus = ProductStatus;

  currentUser: JwtResponse;
  page: any;
  showAddForm = false;
  newProduct = new ProductInfo();
categories: any[] = [];
searchText: string = "";
allProducts: ProductInfo[] = []; // avant filtrage

  private querySub: Subscription;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private route: ActivatedRoute,
          private categoryService: ProductCategoryService
    
  ) {}

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => this.update());
    this.categoryService.getAll().subscribe(data => {
    this.categories = data;
    this.categoryService.getAll().subscribe(data => {
  this.categories = data;
});

  });
  }
  getCategoryName(type: number): string {
  const category = this.categories.find(c => c.categoryType === type);
  return category ? category.categoryName : 'Unknown';
}


  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  update() {
    const currentPage = +this.route.snapshot.queryParamMap.get('page') || 1;
    const size = +this.route.snapshot.queryParamMap.get('size') || 7;
    this.getProds(currentPage, size);
  }

getProds(page: number = 1, size: number = 5) {
  this.productService.getAllInPage(page, size).subscribe(p => {
    this.page = p;
    this.allProducts = p.content; // stocker les produits non filtrés
  });
}
filterProducts() {
  if (!this.searchText || this.searchText.trim() === "") {
    this.page.content = this.allProducts.slice(); // reset
    return;
  }

  const text = this.searchText.toLowerCase();

  this.page.content = this.allProducts.filter(prod =>
    prod.productName.toLowerCase().includes(text) ||
    (prod.productDescription && prod.productDescription.toLowerCase().includes(text)) ||
    prod.productId.toString().includes(text) ||
    this.getCategoryName(prod.categoryType).toLowerCase().includes(text)
  );
}

  createProduct() {
    this.productService.create(this.newProduct).subscribe({
      next: (prod) => {
        alert('✅ Product created successfully!');
        this.newProduct = new ProductInfo();
        this.showAddForm = false;
        this.update();
      },
      error: (err) => console.error(err)
    });
  }

  remove(productInfos: ProductInfo[], productId: string) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delelte(productId).subscribe({
      next: () => {
        alert('🗑️ Product removed');
        this.update();
      },
      error: (err) => console.error(err)
    });
  }
}
