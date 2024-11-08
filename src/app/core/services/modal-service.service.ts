import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRoom } from '../../interfaces/Room';
@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private roomDataSubject = new BehaviorSubject<IRoom>({
    id: '',
    state: 'waiting',
    turn: 'X',
    board: [],
    jugador1_id: '',
    jugador2_id: '',
    date_creation: new Date(),
    winner: 0,
  });

  roomData$ = this.roomDataSubject.asObservable(); 

  updateRoomData(data: any) {
    this.roomDataSubject.next(data); 
  }
}
