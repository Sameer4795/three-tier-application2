import { TestBed } from '@angular/core/testing';

import { Employeeservices } from './employeeservices';

describe('Employeeservices', () => {
  let service: Employeeservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employeeservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
