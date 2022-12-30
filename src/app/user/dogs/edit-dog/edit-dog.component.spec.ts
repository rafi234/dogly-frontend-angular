import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDogComponent } from './edit-dog.component';

describe('EditDogComponent', () => {
  let component: EditDogComponent;
  let fixture: ComponentFixture<EditDogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
