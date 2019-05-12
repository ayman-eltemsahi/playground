import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstarMainComponent } from './astar-main.component';

describe('AstarMainComponent', () => {
  let component: AstarMainComponent;
  let fixture: ComponentFixture<AstarMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstarMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
