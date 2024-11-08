import { Injectable } from '@angular/core';
import { IRoom } from '../../interfaces/Room';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  currentRoomId!: string;
  currentRoom!: IRoom;  
  private rooms: IRoom[] = []

  constructor(private webSocketService: WebsocketService) { }

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

  updateBoard(board: string[]) {
    this.webSocketService.updateBoard(board);
  }

  initBoard() {
    this.currentRoom.board = Array(9).fill('');
  }

}
