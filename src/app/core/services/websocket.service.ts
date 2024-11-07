import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends Socket {

  constructor() {
    super({
      url: 'http://localhost:3000',
      options: {
        transports: ['websocket'],
      },
    });
  }

  /** METODOS PARA RECIBIR */
  // Método para recibir salas disponibles
  onAvailableRooms() {
    return this.fromEvent('availableRooms');
  }

  getWebSocketId() {
    return this.fromEvent('connectionStatus')
  }

  getJoinedRoom() {
    return this.fromEvent('joinedRoom')
  }

  onRoomCreated() {
    return this.fromEvent('roomCreatedForYou');
  }

  onRoomReady() {
    return this.fromEvent('readyToStart')
  }

  /** METODOS PARA EMITIR */
  // Emitir evento para solicitar salas disponibles
  requestAvailableRooms() {
    this.emit('getAvailableRooms');
  }

  createRoom(player1_id: string) {
    this.emit('createRoom', { player1_id });
  }

  joinRoom(roomId: string, player2_id: string) {
    this.emit('joinRoom', roomId );
  }

  closeRoom(roomId: string) {
    this.emit('closeRoom', { roomId });
  }
}
