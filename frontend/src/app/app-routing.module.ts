import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DetailComponent } from './pages/product-detail/detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from './_guards/auth.guard';
import { OrderComponent } from './pages/order/order.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductListComponent } from './pages/product-list/product.list.component';
import { UserDetailComponent } from './pages/user-edit/user-detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { Role } from './enum/Role';
import { HomeComponent } from './pages/home/home.component';
import { CategorieListComponent } from './pages/categorie-list/categorie-list.component';
import { AdminuserComponent } from './pages/adminuser/adminuser.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'category/:id', component: CardComponent },
  { path: 'product/:id', component: DetailComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' },

  // Panier (uniquement Customer)
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: {}
  },

  //  Commandes (Customer)
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuard],
    data: { }
  },
  {
    path: 'order/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard],
    data: {  }
  },

  // ✅ Espace vendeur/manager
  {
    path: 'seller/product',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager, Role.Employee] }
  },
  {
    path: 'seller/product/:id/edit',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager, Role.Employee] }
  },
  {
    path: 'seller/product/new',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Manager, Role.Employee] }
  },
  { path: 'categories', component: CategorieListComponent },
  { path: 'admin/users', component: AdminuserComponent },


  {
    path: 'profile',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Customer, Role.Manager, Role.Employee] }
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
