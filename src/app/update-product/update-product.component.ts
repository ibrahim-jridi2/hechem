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
  constructor(private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });

    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data;
    }, error => console.log(error));
  }
  get f() {
    return this.form.controls;
  }
  onSubmit(){
    this.product.name = this.f.name.value;
    this.product.category = this.f.category.value;
    this.product.price = this.f.price.value;

   ;
    this.productService.update(this.id, this.product).subscribe( data =>{
      this.goToproductList();
    }
    , error => console.log(error));
  }

  goToproductList(){
    this.router.navigate(['/products']);
  }

  openSnackBar(message: string,t=2000) {
    this._snackBar.open(message,'',
    {
      duration:2000,
      panelClass: ['green-snackbar']
    });
  }

}
