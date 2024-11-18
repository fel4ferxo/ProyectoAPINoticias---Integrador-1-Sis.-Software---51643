import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaApirestComponent } from './prueba-apirest.component';

describe('PruebaApirestComponent', () => {
  let component: PruebaApirestComponent;
  let fixture: ComponentFixture<PruebaApirestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaApirestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaApirestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
