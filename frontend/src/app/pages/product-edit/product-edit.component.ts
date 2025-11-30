import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ProductInfo } from '../../models/productInfo';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterContentChecked {

  product = new ProductInfo();
  productId: string;
  isEdit = false;
categories: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
      private categoryService: ProductCategoryService

  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
this.categoryService.getAll().subscribe(data => {
    this.categories = data;
  });
    if (this.productId) {
      // Mode édition
      this.isEdit = true;
      this.productService.getDetail(this.productId)
        .subscribe(prod => this.product = prod);
    } else {
      // Mode création
      this.isEdit = false;
      this.product = new ProductInfo();
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.update();
    } else {
      this.add();
    }
  }

  add() {
    this.productService.create(this.product).subscribe({
      next: (prod) => {
        if (!prod) throw new Error();
        alert('✅ Product created successfully!');
        this.router.navigate(['/seller/product']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error creating product');
      }
    });
  }

  update() {
    this.productService.update(this.product).subscribe({
      next: (prod) => {
        if (!prod) throw new Error();
        alert('✅ Product updated successfully!');
        this.router.navigate(['/seller/product']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error updating product');
      }
    });
  }

  ngAfterContentChecked(): void {
    console.log(this.product);
  }
}
