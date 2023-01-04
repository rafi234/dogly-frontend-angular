import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalThanksComponent } from './modal-thanks.component';

describe('ModalThanksComponent', () => {
  let component: ModalThanksComponent;
  let fixture: ComponentFixture<ModalThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalThanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
