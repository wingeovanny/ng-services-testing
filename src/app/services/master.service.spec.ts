import { ValueServiceService } from './value.service.service';
import { MasterService } from './master.service';
import { FakeValueService } from './value-fake.service';

describe('MasterService', () => {
  let masterservice: MasterService;

  it('should return "my value" from the real service', () => {
    const valueService = new ValueServiceService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "other value" from the fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(
      fakeValueService as unknown as ValueServiceService
    );
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "other value" from the fake object', () => {
    const fake = { getValue: () => 'fake from obj' };
    const masterService = new MasterService(fake as ValueServiceService);
    expect(masterService.getValue()).toBe('fake from obj');
  });
  it('should call to getValue from ValueService', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value');
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value'); // ok
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
