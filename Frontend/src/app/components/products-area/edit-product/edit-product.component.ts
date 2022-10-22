import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryModel } from 'src/app/shared/models/category.model';
import { ProductModel } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public categories : CategoryModel[] = []
  public product : ProductModel;
  public form: FormGroup;
  public imageData: string;

  constructor(private productsService: ProductsService,private toastrService: ToastrService,private activatedRoute: ActivatedRoute,) { }

  async ngOnInit(){
    this.categories = await this.productsService.getAllCategories()
    this.form = new FormGroup({
      _id: new FormControl(null),
      productName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
    });

    this.activatedRoute.params.subscribe(params => {
      this.productsService.getProductById(params['id']).subscribe(product => {
        this.product = product;
        this.form.patchValue({
          _id : this.product._id,
          productName: product.productName,
          price: product.price,
          categoryId: product.categoryId,
          imageUrl: product.imageUrl,
        });
      });
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imageUrl: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }  
  }

  public async editProduct(){
    if(this.form.valid){
      const product = this.form.value;
      await this.productsService.editProduct(product,this.imageData)
      this.toastrService.success("Product edited successfully")
      this.form.reset()
    }
  }



}
