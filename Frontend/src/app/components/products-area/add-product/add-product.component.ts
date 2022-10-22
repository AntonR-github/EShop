import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/shared/models/product.model';
import { CategoryModel } from '../../../shared/models/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public categories : CategoryModel[] = []
  public product : ProductModel;
  public form: FormGroup;
  public imageData: string;

  constructor(private productsService: ProductsService,private toastrService: ToastrService) { }

  async ngOnInit(){
    this.categories = await this.productsService.getAllCategories()
    this.form = new FormGroup({
      productName: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
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

  public async addProduct(){
    if(this.form.valid){
      const product = this.form.value
      await this.productsService.addProduct(product,this.imageData)
      this.toastrService.success("Product added successfully")
      this.form.reset()
    }
  }

}
