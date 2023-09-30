import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypewriterchatComponent } from './typewriterchat.component';

describe('TypewriterchatComponent', () => {
  let component: TypewriterchatComponent;
  let fixture: ComponentFixture<TypewriterchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypewriterchatComponent]
    });
    fixture = TestBed.createComponent(TypewriterchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
