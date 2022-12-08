import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalksComponent } from './walks.component';

describe('WalksComponent', () => {
  let component: WalksComponent;
  let fixture: ComponentFixture<WalksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
