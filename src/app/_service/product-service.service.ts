import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/product';



let productApi = environment.productApi + 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) {
  }
  getProducts(): Observable <any> {
    return this.http.get<Product[]>(`${productApi}` + '/getProducts');
  }
  getProductById(id:any): Observable <any> {
    return this.http.get<Product[]>(`${productApi}/getProductById/${id}` );
  }

  create(data: any): Observable<any> {
    return this.http.post(`${productApi}/createProduct`, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${productApi}/updateProduct/${id}`, data);
  }
  deleteById(id:any): Observable<any> {
    return this.http.delete(`${productApi}/deleteProduct/${id}`);
  }
}
