import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaPublicacionPage } from './nueva-publicacion.page';

describe('NuevaPublicacionPage', () => {
  let component: NuevaPublicacionPage;
  let fixture: ComponentFixture<NuevaPublicacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevaPublicacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
