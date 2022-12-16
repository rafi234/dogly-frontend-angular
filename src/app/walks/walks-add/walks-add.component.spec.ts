import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalksAddComponent } from './walks-add.component';

describe('WalksAddComponent', () => {
  let component: WalksAddComponent;
  let fixture: ComponentFixture<WalksAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalksAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalksAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
