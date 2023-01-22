import { ValueServiceService } from './value.service.service';
import { MasterService } from './master.service';

fdescribe('MasterService', () => {
  let masterservice: MasterService;

  beforeEach(() => {});

  it('should return "my value" from the real service', () => {
    const valueService = new ValueServiceService();
    masterservice = new MasterService(valueService);
    expect(masterservice.getValueMaster()).toBe('my value');
  });

  it('should return "other value" from the fake object', () => {
    const fake = { getValueMaster: () => 'fake from obj' };

    masterservice = new MasterService(fake as unknown as ValueServiceService);
    expect(masterservice.getValueMaster()).toBe('fake from obj');
  });
});
