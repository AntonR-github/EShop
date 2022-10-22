import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-counter',
  templateUrl: './products-counter.component.html',
  styleUrls: ['./products-counter.component.css']
})
export class ProductsCounterComponent implements OnInit {

  productsCount: number = 0;
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProducts().then(products => {
      this.productsCount = products.length;
    });

  }

}
