import { ValueServiceService } from './value.service.service';

describe('ValueServiceService', () => {
  let service: ValueServiceService;

  beforeEach(() => {
    service = new ValueServiceService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    it('should change the value "my value"', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');

      expect(service.getValue()).toBe('change');
    });
  });

  //con calback y parametro
  describe('Test for getPromiseValue', () => {
    it('should return Promise value from promise with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        //Assert
        expect(value).toBe('promise value');
        doneFn();
      });
    });
  });

  //con callback y async
  describe('Test for getPromiseValue', () => {
    it('should return Promise value from promise using async', async () => {
      const result = await service.getPromiseValue();
      expect(result).toBe('promise value');
    });
  });
});
