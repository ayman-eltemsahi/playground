import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancedCanvasComponent } from './enhanced-canvas.component';

describe('EnhancedCanvasComponent', () => {
  let component: EnhancedCanvasComponent;
  let fixture: ComponentFixture<EnhancedCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnhancedCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancedCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
