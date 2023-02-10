import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit ,Output,Input,OnChanges,SimpleChanges, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../_model/product';
import { ProductServiceService } from '../_service/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from "@angular/material/table";
import { CreateProductComponent } from '../create-product/create-product.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
 //@Input() ELEMENT_DATA: any;
  @Output() event = new EventEmitter<any>()
  displayedColumns: string[] = ['name','category','price','actions'];
  dataSource!: MatTableDataSource<any>;
  products!: Product[];
  product!:Product;

  constructor(private productService: ProductServiceService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.getproducts());
    this.getproducts();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (this.ELEMENT_DATA) {
  //     this.dataSource = new MatTableDataSource<Product>(this.ELEMENT_DATA);
  //   }
  // }
  openSnackBar(message: string,t=2000) {
    this._snackBar.open(message,'',
    {
      duration:2000,
      panelClass: ['warn-snackbar']
    });
  }

  private getproducts(){
    this.productService.getProducts().subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
    });
  }

  productDetails(id: number){
    this.router.navigate(['product-details', id]);
  }

  updateproduct(id: number){
    this.router.navigate(['update-product', id]);
  }

  deleteproduct(id: number){
    this.productService.deleteById(id).subscribe( data => {
      console.log(data);
      this.getproducts();
    })
  }
  // saveproduct(){
  //   this.productService.create(this.product).subscribe( data =>{
  //     //console.log(data);
  //     this.openDialog(data, "Ajouter un nouveau produit", "enable", true)

  //     this.goToproductList();
  //   },
  //   error => console.log(error));
  // }

  goToproductList(){
    this.router.navigate(['/products']);
  }

  // addProduct(){
  //   console.log(this.product);
  //   this.saveproduct();
  // }


}
