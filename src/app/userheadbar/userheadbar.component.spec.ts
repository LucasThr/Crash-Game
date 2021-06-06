import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserheadbarComponent } from './userheadbar.component';

describe('UserheadbarComponent', () => {
  let component: UserheadbarComponent;
  let fixture: ComponentFixture<UserheadbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserheadbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserheadbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
