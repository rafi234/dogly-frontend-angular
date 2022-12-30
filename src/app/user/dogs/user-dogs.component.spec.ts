import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDogsComponent } from './user-dogs.component';

describe('DogsComponent', () => {
  let component: UserDogsComponent;
  let fixture: ComponentFixture<UserDogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
