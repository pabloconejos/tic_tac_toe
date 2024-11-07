import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
import { IRoom, RoomPlayers } from '../../interfaces/Room';
import { Observable } from 'rxjs';

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
  onAvailableRooms(): Observable<IRoom[]> {
    return this.fromEvent<IRoom[]>('availableRooms');
  }

  getWebSocketId():Observable<{id: string}> {
    return this.fromEvent<{id: string}>('connectionStatus')
  }

  getJoinedRoom(): Observable<IRoom> {
    return this.fromEvent<IRoom>('joinedRoom');
  }

  onRoomCreated(): Observable<{id: string, romm: IRoom}> {
    return this.fromEvent<{id: string, romm: IRoom}>('roomCreatedForYou');
  }

  onRoomReadyToStart(): Observable<RoomPlayers> {
    return this.fromEvent<RoomPlayers>('readyToStart')
  }

  onStartPlay(): Observable<any> {
    return this.fromEvent<any>('startPlay')
  }

  /** METODOS PARA EMITIR */
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
    this.emit('closeRoom', roomId );
  }

  startPlay(roomId: string) {
    this.emit('startPlay', roomId );
  }
}
