import { NavigationEnd, Router } from '@angular/router';
import { ProductServiceService } from './_service/product-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'productApp';
  searchResults!:any[];
  errorMessage = '';
  currentRoute:any;
  constructor(private productService:ProductServiceService,private router: Router){
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });


  }

  // search(query:string){
  //   this.productService.searchProduct(query).subscribe(results=>{
  //     this.searchResults=results;
  //   },
  //   error => {

  //     this.errorMessage = 'An error occurred while searching. Please try again later.';
  //   }
  //   )
  // }
}
