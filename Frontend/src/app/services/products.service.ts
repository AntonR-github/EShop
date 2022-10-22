import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../shared/models/category.model';
import { ProductModel } from '../shared/models/product.model';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  public async getAllProducts():Promise<ProductModel[]>{
    const observable = this.http.get<ProductModel[]>(environment.productsUrl)
    const products = await firstValueFrom(observable)
    return products
  }

  public async getProductsBySearchTerm(searchTerm:string):Promise<ProductModel[]>{
    const observable = this.http.get<ProductModel[]>(environment.productsBySearchUrl + searchTerm)
    const products = await firstValueFrom(observable)
    return products
  }

  public async getAllCategories():Promise<CategoryModel[]>{
    const observable = this.http.get<CategoryModel[]>(environment.categoriesUrl)
    const categories = await firstValueFrom(observable)
    return categories
  }

  public async getAllProductsByCategory(categoryId:string):Promise<ProductModel[]>{
    if(categoryId === "All"){
      return await this.getAllProducts()
    }
    const observable = this.http.get<ProductModel[]>(environment.productsByCategoryUrl + categoryId)
    const products = await firstValueFrom(observable)
    return products
  }

  getProductById(_id:string):Observable<ProductModel>{
    return this.http.get<ProductModel>(environment.productsByIdUrl + _id)
  }

  public async addProduct(product:ProductModel,image:string ):Promise<void>{
    const observable = this.http.post(environment.productsUrl,{...product,imageUrl:image})
    await firstValueFrom(observable)
  }

  public async editProduct(product:ProductModel,image:string ):Promise<void>{
    const observable = this.http.put(environment.productsUrl,{...product,imageUrl:image})
    await firstValueFrom(observable)
  }



}
