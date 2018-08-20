import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SarComponent } from './sar.component';

describe('SarComponent', () => {
  let component: SarComponent;
  let fixture: ComponentFixture<SarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
