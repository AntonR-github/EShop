import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { ProductModel } from 'src/app/shared/models/product.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: ProductModel
  user : UserModel
  isAdmin : boolean = false;

  constructor(
    activatedRoute: ActivatedRoute,  
    productsService: ProductsService, 
    private cartService: CartService,
    private router: Router,
    private userService: UserService
    ) 

    { activatedRoute.params.subscribe((params) => {
      if(params.id)
      productsService.getProductById(params.id).subscribe(serverProduct => {
        this.product = serverProduct;
      })
    })
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.isAdmin = this.user.isAdmin;
  }

  addToCart(){
   this.cartService.addToCart(this.product);
   this.router.navigateByUrl('/cart')
  }
}

