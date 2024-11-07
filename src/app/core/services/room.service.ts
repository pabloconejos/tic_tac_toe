import { Injectable } from '@angular/core';
import { IRoom } from '../../interfaces/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  currentRoomId!: string;
  currentRoom!: IRoom;
  private rooms: IRoom[] = []

  constructor() { }

  setRooms(rooms: IRoom[]) {
    this.rooms = rooms
  }

  getRooms(): IRoom[] {
    return this.rooms;
  }

  players(room: IRoom) {
    return room.jugador2_id ? '2/2' : '1/2'
  }

  removeCurrentRoomId() {
    this.currentRoomId = ''
  }

}
