import { Injectable } from '@angular/core';
import { Room } from '../../interfaces/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  currentRoomId!: string;
  currentRoom!: Room;
  private rooms: Room[] = []

  constructor() { }

  setRooms(rooms: Room[]) {
    this.rooms = rooms
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  players(room: Room) {
    return room.jugador2_id ? '2/2' : '1/2'
  }

  removeCurrentRoomId() {
    this.currentRoomId = ''
  }

}
