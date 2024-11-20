import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa los tokens necesarios
import { WaitingRoomComponent } from './waiting-room.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('WaitingRoomComponent', () => {
  let component: WaitingRoomComponent;
  let fixture: ComponentFixture<WaitingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitingRoomComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: 
          {
            id: '1',
            state: 'waiting',
            turn: 'X',
            board: [],
            jugador1_id: '11',
            jugador2_id: '22',
            date_creation: '20/11/204',
            winner: ''
          } 
        }, // Proporciona datos simulados
        { provide: MatDialogRef, useValue: {} }, // Simula la referencia al diálogo
        TranslateService
      ],
      imports: [
        TranslateModule.forRoot(),  // Importa el SharedModule aquí
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
