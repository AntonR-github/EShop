import { CategoryModel } from './category.model';


export class ProductModel {
    public _id: string;
    public productName: string;
    public price: number;
    public imageUrl: string;
    public categoryId: string;
    public category: CategoryModel;
}