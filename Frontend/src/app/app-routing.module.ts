import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { CartComponent } from './components/cart-area/cart/cart.component';
import { CheckoutComponent } from './components/cart-area/checkout/checkout.component';
import { PaymentPageComponent } from './components/cart-area/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/orders-area/order-track-page/order-track-page.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { EditProductComponent } from './components/products-area/edit-product/edit-product.component';
import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { LoginComponent } from './components/user-area/login/login.component';
import { RegisterComponent } from './components/user-area/register/register.component';
import { OrderReceiptComponent } from './components/orders-area/order-receipt/order-receipt.component';

const routes: Routes = [
    {path:'', redirectTo:'products', pathMatch:'full'},
    {path:'products', component: ProductsListComponent,},
    {path:'products/new', component: AddProductComponent, canActivate: [AuthGuard]},
    {path:'products/edit/:id', component: EditProductComponent, canActivate: [AuthGuard]},
    {path:'product/:id', component: ProductDetailsComponent,},
    {path: 'cart', component: CartComponent,},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
    {path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard]},
    {path: 'track', component: OrderTrackPageComponent, canActivate: [AuthGuard]},
    {path: 'receipt/:id', component: OrderReceiptComponent, canActivate: [AuthGuard]},
    { path: "**", redirectTo: "products" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
