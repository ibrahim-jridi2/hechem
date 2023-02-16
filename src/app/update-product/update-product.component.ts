import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product';
import { ProductServiceService } from '../_service/product-service.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id!: number;
  form!: FormGroup;
  product: Product = new Product();
  matcher = new MyErrorStateMatcher();
  errorMessage!:string

  constructor(private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data;
      this.form = this.fb.group({
        name: [this.product.name, [Validators.required, Validators.minLength(2)]],
        category: [this.product.category, [Validators.required]],
        price: [this.product.price, [Validators.required,Validators.pattern("^[0-9]*$")]]
      });
    }, error => console.log(error));
  }
  // get f() {
  //   return this.form.controls;
  // }
  onSubmit(){
    // this.product.name = this.f.name.value;
    // this.product.category = this.f.category.value;
    // this.product.price = this.f.price.value;
    this.product=this.form.value;

    this.productService.update(this.id, this.product).subscribe( data =>{
      this.openSnackBar('Product updated successfully')
      this.goToproductList();
    }
    , (error: HttpErrorResponse )=> {
      //this.errorMessage = error;

      //console.error('Error submitting form:', error);
      //this.errorMessage = error
      if (error.error instanceof ErrorEvent) {
        // client-side error
        console.error('An error occurred:', error.error.message);
        return this.openSnackBar('there\'s an error : '+error.error.message,"fail")
      } else {
        // server-side error
        console.error(`Error Code: ${error.status} Message: ${error.message}`);
        let errorResponse = error.error as HttpErrorResponse;
        this.errorMessage = errorResponse.message;
        return this.openSnackBar('there\'s an error : '+error.message,"fail")
      }
    }
    );
  }

  goToproductList(){
    this.router.navigate(['/products']);
  }

  openSnackBar(message: string,snackBarClass:string="successful") {

    this._snackBar.open(message,'',
    {
      duration:2000,
      panelClass: snackBarClass
    });
  }

}
