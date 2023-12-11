import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StanarComponent } from './stanar.component';

describe('StanarComponent', () => {
  let component: StanarComponent;
  let fixture: ComponentFixture<StanarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StanarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StanarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
