import { TokenService } from './token.service';
import { TokenInterceptor } from './../interceptors/token.interceptor';
import {
  generateManyProducts,
  generateOneProduct,
} from './../models/product.mock';
import { environment } from './../../environments/environment';
import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from './../models/product.model';
import { ProductsService } from './product.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';

fdescribe('ProductService', () => {
  let serviceProduct: ProductsService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    serviceProduct = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should create a product', () => {
    expect(serviceProduct).toBeTruthy();
  });

  describe('Test from getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);
      spyOn(tokenService, 'getToken').and.returnValue('123');

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
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      expect();
      req.flush(mockData);
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
        {
          ...generateOneProduct(),
          price: 0, //200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: -10, //200 * .19 = 38
        },
      ];
      //Act
      serviceProduct.getAll().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params width limit 10 offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      serviceProduct.getAll(limit, offset).subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('Test for create', () => {
    it('should return a new product', () => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'Download file media',
        categoryId: 9,
      };
      //Act
      serviceProduct.create({ ...dto }).subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
      });

      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('Test for update product', () => {
    it('#update, should update a product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const productId = '1';
      const dto: UpdateProductDTO = {
        title: 'Product edited',
        price: 1000,
        images: ['img'],
        description: 'This is a product edited',
        categoryId: 12,
      };
      // Act
      serviceProduct.update(productId, { ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('Test for delete product', () => {
    it('#Delete, should delete a product', (doneFn) => {
      // Arrange
      const productId = '1';
      // Act
      serviceProduct.delete(productId).subscribe((data) => {
        // Assert
        expect(data).toBe(true);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(true);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('Test for getOne', () => {
    it('should return a one product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const productId = '1';
      // Act
      serviceProduct.getOne(productId).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the rigth  msg when the status code is 404', (doneFn) => {
      // Arrange

      const productId = '1';
      const msgerror = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgerror,
      };
      // Act
      serviceProduct.getOne(productId).subscribe({
        error: (err) => {
          //Assert
          expect(err).toEqual('El producto no existe');
          doneFn();
        },
      });
      // Http Config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(`${url}`);
      req.flush(msgerror, mockError);
      expect(req.request.method).toEqual('GET');
    });
  });
});
