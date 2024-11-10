import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalServiceService } from '@core/services';

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrl: './winner-modal.component.scss'
})
export class WinnerModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {winner: boolean, message: string}, 
    private dialogRef: MatDialogRef<WinnerModalComponent>,
  ) { }


  cerrarModal() {
    const result = { success: true, message: 'Iniciar partida', tipo: 'home'};
    this.dialogRef.close(result);
  }
}
