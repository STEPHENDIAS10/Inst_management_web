import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteUpdateComponent } from './institute-update.component';

describe('InstituteUpdateComponent', () => {
  let component: InstituteUpdateComponent;
  let fixture: ComponentFixture<InstituteUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
