import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { loginGuard } from './login.guard';

describe('loginGuard', () => {
  let guard: CanActivateFn

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
