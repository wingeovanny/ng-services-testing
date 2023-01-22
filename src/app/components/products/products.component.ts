import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private serviceProducts: ProductsService) {}

  ngOnInit(): void {
    this.getAllProdutcs();
  }

  getAllProdutcs() {
    this.serviceProducts.getAllSimple().subscribe((product) => {
      this.products = product;
    });
  }
}
