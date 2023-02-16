import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../_model/product';
import {catchError} from 'rxjs/operators';


let productApi = environment.productApi + 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) {
  }
  getProducts(): Observable <any> {
    return this.http.get<Product[]>(`${productApi}` + '/getProducts').pipe(catchError(this.handleError));
  }
  getProductById(id:any): Observable <any> {
    return this.http.get<Product[]>(`${productApi}/getProductById/${id}` ).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<any> {
    return this.http.post(`${productApi}/createProduct`, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${productApi}/updateProduct/${id}`, data);
  }
  deleteById(id:any): Observable<any> {
    return this.http.delete(`${productApi}/deleteProduct/${id}`).pipe(catchError(this.handleError));
  }
  searchProduct(query:any):Observable<any>{
    return this.http.get<Product[]>(`${productApi}/searchProduct/${query}` );

  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage=''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errorMessage=`Backend returned code ${error.status}, body was: `, error.error;
    }
    // Return an observable with a user-facing error message.
    errorMessage+='Something bad happened; please try again later.';
    return throwError(() => new Error(errorMessage));
  }
}
