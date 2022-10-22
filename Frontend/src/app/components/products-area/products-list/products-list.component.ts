import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { ProductModel } from 'src/app/shared/models/product.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public categories: CategoryModel[] = [];
  public products : ProductModel[] = [];
  searchTerm = '';
  results: ProductModel[];
  user : UserModel
  isAdmin : boolean = false;

  constructor(private productsServices: ProductsService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private userService: UserService) { 
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm'])
      this.searchTerm = params['searchTerm']
    });

  }

  async ngOnInit()  {

    try {
      this.categories = await this.productsServices.getAllCategories();  
      if (this.activatedRoute.snapshot.params['searchTerm'])
      {
        this.products = await this.productsServices.getProductsBySearchTerm(this.activatedRoute.snapshot.params['searchTerm']);
        return;
      }
      
      else if (!this.activatedRoute.snapshot.params['categoryId'] && !this.activatedRoute.snapshot.params['searchTerm'])
      {
        this.products = await this.productsServices.getAllProducts();
      }

    } catch (err:any) {
      alert(err.message);
    }

    this.user = this.userService.getCurrentUser();
    this.isAdmin = this.user.isAdmin;
  }


  

     
  


    public async display(args:Event){
      try {
        const selectElement = args.target as HTMLSelectElement;
        const categoryId = selectElement.value;
        this.products = await this.productsServices.getAllProductsByCategory(categoryId);
        
      } catch (err:any) {
        alert(err.message);
      }

    }

    



    public async search(){
      try {
        if(this.searchTerm){
          this.products = await this.productsServices.getProductsBySearchTerm(this.searchTerm);
        } else if (!this.searchTerm){
          this.products = await this.productsServices.getAllProducts();
        }
         
      } catch (err:any) {
        alert(err.message);
      }
    }

    goToAddProduct(){
      this.router.navigateByUrl('/products/new');
    }


     



   
    }



   
    









