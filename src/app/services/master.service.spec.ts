import { ValueServiceService } from './value.service.service';
import { MasterService } from './master.service';

fdescribe('MasterService', () => {
  let masterservice: MasterService;

  it('should return "my value" from the real service', () => {
    const valueService = new ValueServiceService();
    masterservice = new MasterService(valueService);
    expect(masterservice.getValue()).toBe('my value');
  });

  it('should call to getValue from ValueService');
  const valueServiceSpy = jasmine.createSpyObj('ValueServiceService', [
    'getValue',
  ]);
  valueServiceSpy.getValue.and.returnValue('fake value');
  const masterService = new MasterService(valueServiceSpy);
  expect(masterService.getValue()).toBe('fake value');
  expect(valueServiceSpy.getValue).toHaveBeenCalled();
});
