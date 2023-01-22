import { Injectable } from '@angular/core';
import { ValueServiceService } from './value.service.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private valueServiceService: ValueServiceService) {}

  getValueMaster() {
    return this.valueServiceService.getValue();
  }
}
