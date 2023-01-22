import {
  generateManyProducts,
  generateOneProduct,
} from './../models/product.mock';
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
      const mockData: Product[] = generateManyProducts(2);
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

  describe('Test from getAll', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);
      //Act
      serviceProduct.getAll().subscribe((data) => {
        //Assert

        expect(data.length).toBe(mockData.length);
        doneFn();
      });

      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });

    it('should return a product list with taxes', (doneFn) => {
      //Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, //200 * .19 = 38
        },
      ];
      //Act
      serviceProduct.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
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
