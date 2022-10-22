import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';
import { CartComponent } from './components/cart-area/cart/cart.component';
import { TitleComponent } from './shared/components/title/title.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './components/user-area/login/login.component';
import { TextInputComponent } from './shared/components/text-input/text-input.component';
import { InputContainerComponent } from './shared/components/input-container/input-container.component';
import { InputValidationComponent } from './shared/components/input-validation/input-validation.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultButtonComponent } from './shared/components/default-button/default-button.component';
import { RegisterComponent } from './components/user-area/register/register.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutComponent } from './components/cart-area/checkout/checkout.component';
import { OrderItemsListComponent } from './components/cart-area/order-items-list/order-items-list.component';
import { MapComponent } from './components/cart-area/map/map.component';
import { PaymentPageComponent } from './components/cart-area/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/cart-area/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/orders-area/order-track-page/order-track-page.component';
import { OrdersCounterComponent } from './components/layout-area/orders-counter/orders-counter.component';
import { ProductsCounterComponent } from './components/layout-area/products-counter/products-counter.component';
import { ShoppingWindowComponent } from './components/layout-area/shopping-window/shopping-window.component';
import { EditProductComponent } from './components/products-area/edit-product/edit-product.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { OrderReceiptComponent } from './components/orders-area/order-receipt/order-receipt.component';




@NgModule({
  declarations: [
    LayoutComponent,
    ProductsListComponent,
    AddProductComponent,
    HeaderComponent,
    ProductDetailsComponent,
    CartComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    TextInputComponent,
    InputContainerComponent,
    InputValidationComponent,
    DefaultButtonComponent,
    RegisterComponent,
    LoadingComponent,
    CheckoutComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,
    OrdersCounterComponent,
    ProductsCounterComponent,
    ShoppingWindowComponent,
    EditProductComponent,
    HighlighterPipe,
    OrderReceiptComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true}
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
