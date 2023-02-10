import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../_model/product';
import { ProductServiceService } from '../_service/product-service.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;
  product: Product = new Product();
  matcher = new MyErrorStateMatcher();
  errorMessage!:string;
  submit:boolean=false;
  constructor(private productService: ProductServiceService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  saveproduct(){
    //debugger;
    this.productService.create(this.form.value).subscribe( data =>{
      this.submit=true;
      this.openSnackBar('Product Added successfully')
      this.goToproductList();
    },
    error => {
      this.openSnackBar('ther"s an error')
      console.error('Error submitting form:', error);
      //this.errorMessage = error
    }
    );
  }

  goToproductList(){
    this.router.navigate(['/products']);
  }

  onSubmit(){
    console.log(this.form.value);
    this.saveproduct();
  }

  openSnackBar(message: string,t=2000) {

    this._snackBar.open(message,'',
    {
      duration:2000,
      panelClass: ['green-snackbar']
    });
  }

}
