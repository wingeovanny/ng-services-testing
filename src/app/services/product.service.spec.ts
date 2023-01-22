import { environment } from './../../environments/environment';
import { Product } from './../models/product.model';
import { ProductsService } from './product.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

fdescribe('ProductService', () => {
  let serviceProduct: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    serviceProduct = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create a product', () => {
    expect(serviceProduct).toBeTruthy();
  });

  describe('Test from getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = [
        {
          id: '123',
          title: 'title',
          price: 12,
          description: 'descripcion',
          category: {
            id: 102,
            name: 'cate',
          },
          images: ['img1', 'img2'],
        },
      ];
      //Act
      serviceProduct.getAllSimple().subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        expect(data.length).toBe(mockData.length);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
