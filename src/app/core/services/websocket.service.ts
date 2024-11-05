import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends Socket {

  constructor() {
    super({
      url: 'http://localhost:3000', // Cambia esta URL por la de tu servidor NestJS
      options: {
        transports: ['websocket'], // Opcional, dependiendo de tus necesidades
      },
    });
  }

  // Método para recibir salas disponibles
  onAvailableRooms() {
    return this.fromEvent('availableRooms');
  }

  getWebSocketId() {
    return this.fromEvent('connectionStatus')
  }

  // Emitir evento para solicitar salas disponibles
  requestAvailableRooms() {
    this.emit('getAvailableRooms'); // Este evento debe ser manejado en tu servidor
  }

  createRoom(player1_id: string) {
    this.emit('createRoom', { player1_id }); // Envía el ID del jugador que crea la sala
  }

  // Método para escuchar la creación de la sala
  onRoomCreated() {
    return this.fromEvent('roomCreatedForYou'); // Asegúrate de que el servidor emita este evento
  }
}
