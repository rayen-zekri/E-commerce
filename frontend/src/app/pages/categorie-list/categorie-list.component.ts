import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/Categorie';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  categories: Categorie[] = [];

  constructor(private categorieService: ProductCategoryService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.categorieService.getAll().subscribe({
      next: data => this.categories = data,
      error: err => console.error(err)
    });
  }

  deleteCategory(categoryId: number) {
  const ok = window.confirm("Are you sure you want to delete this category?");

  if (!ok) return;
  console.log("Deleting ID = ", categoryId);

  this.categorieService.delete(categoryId).subscribe({
    next: () => {
      alert("Category deleted successfully!");
    },
    error: (err) => {
      console.error(err);
   
    }
  });
}
showForm = false;

newCategory: Categorie = {
  categoryId: null,
  categoryName: '',
  categoryType: null,
  createTime: null,
  updateTime: null
};

toggleForm() {
  this.showForm = !this.showForm;
}

createCategory() {
  this.categorieService.save(this.newCategory).subscribe({
    next: () => {
      alert("Catégorie ajoutée avec succès !");
      this.showForm = false;
      this.newCategory = { categoryId: null, categoryName: '', categoryType: null, createTime: null, updateTime: null };
      this.load();
    },
    error: err => {
      console.error(err);
      alert("Erreur lors de l'ajout !");
    }
  });
}


}
