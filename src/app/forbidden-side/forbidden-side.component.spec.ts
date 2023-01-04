import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbiddenSideComponent } from './forbidden-side.component';

describe('ForbiddenSideComponent', () => {
  let component: ForbiddenSideComponent;
  let fixture: ComponentFixture<ForbiddenSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForbiddenSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForbiddenSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
