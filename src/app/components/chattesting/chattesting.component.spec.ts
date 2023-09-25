import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattestingComponent } from './chattesting.component';

describe('ChattestingComponent', () => {
  let component: ChattestingComponent;
  let fixture: ComponentFixture<ChattestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChattestingComponent]
    });
    fixture = TestBed.createComponent(ChattestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
