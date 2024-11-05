import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../../core/services/websocket.service';
import { RoomService } from '../../../../core/services/room.service';
import { Room } from '../../../../interfaces/Room';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private websocketService: WebsocketService,
    public roomService: RoomService,
    public userService: UserService) {}

  ngOnInit() {
    this.websocketService.onAvailableRooms().subscribe((rooms: any) => {
      console.log('Salas disponibles:', rooms);
      this.roomService.setRooms(rooms)
    });

    this.websocketService.onRoomCreated().subscribe((room: any) => {
      console.log('ROOM FOR ME',room.id);
      this.roomService.currentRoomId = room.id
      // entrar en la sala de espera hasta que se una otro jugador
    });

    this.websocketService.getWebSocketId().subscribe((user: any) => {
      this.userService.setUserId(user.id)
    });

    this.websocketService.requestAvailableRooms();
    
  }

  createRoom() {
    const player1_id = this.userService.getUserId;
    this.websocketService.createRoom(player1_id.toString());
  }
}
