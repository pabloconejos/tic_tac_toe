import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
import { IRoom, RoomPlayers } from '../../interfaces/Room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends Socket {

  constructor() {
    super({
      url: environment.apiUrl,
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

  onRoomCreated(): Observable<{id: string, room: IRoom}> {
    return this.fromEvent<{id: string, room: IRoom}>('roomCreatedForYou');
  }

  onRoomReadyToStart(): Observable<RoomPlayers> {
    return this.fromEvent<RoomPlayers>('readyToStart')
  }

  onStartPlay(): Observable<any> {
    return this.fromEvent<any>('startPlay')
  }

  onUpdateBoard(): Observable<IRoom> {
    return this.fromEvent<IRoom>('updateBoard')
  }

  onError(): Observable<{ message: string }> {
    return this.fromEvent<{ message: string }>('error');
  }

  roomClosed(): Observable<string> {
    return this.fromEvent<string>('roomClosed');
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

  updateBoard(room: IRoom) {
    this.emit('updateBoard', room );
  }
}
