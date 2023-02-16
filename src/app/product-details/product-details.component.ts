import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product';
import { ProductServiceService } from '../_service/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id!: number
  product!: Product
  constructor(private route: ActivatedRoute, private productService: ProductServiceService,
    private router: Router,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.product = new Product();
    this.productService.getProductById(this.id).subscribe( data => {
      this.product = data;
    });
  }
  goToproductList(){
    this.router.navigate(['/products']);
  }
}
