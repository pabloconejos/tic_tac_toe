import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Room } from '../../interfaces/Room';
@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private roomDataSubject = new BehaviorSubject<Room>({
    id: '',
    estado: 'waiting',
    turno: 1,
    tablero: '',
    jugador1_id: '',
    jugador2_id: '',
    fecha_creacion: new Date(),
    ganador: 0,
  });

  roomData$ = this.roomDataSubject.asObservable(); 

  updateRoomData(data: any) {
    this.roomDataSubject.next(data); 
  }
}
