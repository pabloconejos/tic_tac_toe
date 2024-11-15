import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRoom } from '../../interfaces/Room';
import { Subscription } from 'rxjs';
import { ModalServiceService } from '../../core/services/modal-service.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrl: './waiting-room.component.scss'
})
export class WaitingRoomComponent implements OnInit{

  private dataSubscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IRoom, 
    private modalService: ModalServiceService,
    private dialogRef: MatDialogRef<WaitingRoomComponent>,  // Inyecta MatDialogRef aquí
    public userService: UserService
  ) { }

  ngOnInit() {
    // Nos suscribimos al observable para recibir actualizaciones
    this.dataSubscription = this.modalService.roomData$.subscribe((roomData) => {
      if (roomData) {
        this.data = roomData
      }
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  empezarPartida() {
    const result = { success: true, message: 'Iniciar partida', tipo: 'iniciar', roomId: this.data.id };
    this.dialogRef.close(result);
  }

  cerrarPartida() {
    const result = { success: true, message: 'El modal se cerró correctamente', tipo: 'close', roomId: this.data.id };
    this.dialogRef.close(result);
  }

}
