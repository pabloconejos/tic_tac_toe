import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa los tokens necesarios
import { WinnerModalComponent } from './winner-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('WinnerModalComponent', () => {
  let component: WinnerModalComponent;
  let fixture: ComponentFixture<WinnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WinnerModalComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { winner: true, message: '¡Ganaste! El otro jugador abandono la partida.'} }, // Proporciona datos simulados
        { provide: MatDialogRef, useValue: {} }, // Simula la referencia al diálogo
        TranslateService
      ],
      imports: [
        TranslateModule.forRoot(),  // Importa el SharedModule aquí
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
