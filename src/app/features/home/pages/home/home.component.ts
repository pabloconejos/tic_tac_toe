import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../../core/services/websocket.service';
import { RoomService } from '../../../../core/services/room.service';
import { Room } from '../../../../interfaces/Room';
import { UserService } from '../../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { WaitingRoomComponent } from '../../../../shared/waiting-room/waiting-room.component';
import { ModalServiceService } from '../../../../core/services/modal-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private websocketService: WebsocketService,
    public roomService: RoomService,
    public userService: UserService,
    private dialog: MatDialog,
    private modalService: ModalServiceService) 
  {

  }

  ngOnInit() {
    this.listenEvents()
    this.websocketService.requestAvailableRooms();
  }

  createRoom() {
    const player1_id = this.userService.getUserId();
    this.websocketService.createRoom(player1_id.toString());  
  }

  joinRoom(roomId: string) {
    const player2_id = this.userService.getUserId();
    this.websocketService.joinRoom(roomId, player2_id.toString());
  }

  closeRoom(roomId: string) {
    this.websocketService.closeRoom(roomId);
  }

  abrirSalaEspera(data: any) {
    const dialogRef = this.dialog.open(WaitingRoomComponent, {
      disableClose: true,
      data
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result?.iniciar) {
        
      }

      if (result?.tipo == 'close') {
        this.closeRoom(result?.roomId)
        console.log('Abandonaste la partida')
        this.roomService.removeCurrentRoomId()
      }

      if (!result) {
        console.log('El otro jugador abandono la partida')
        this.roomService.removeCurrentRoomId()
      }
    });
  }

  listenEvents() {
    this.websocketService.onAvailableRooms().subscribe((rooms: any) => {
      this.roomService.setRooms(rooms)
      if (!this.roomService.currentRoomId) {
        return
      }
      const e = rooms.filter((room: Room) => room.id == this.roomService.currentRoomId)
      console.log(e)
      if(e.length >= 1) {
        this.modalService.updateRoomData(e[0]);
      } else {
        this.closeAllModals()
      }

    });

    this.websocketService.onRoomCreated().subscribe((room: any) => {
      console.log('ROOM FOR ME',room.id);
      this.roomService.currentRoomId = room.id
      const data = {
        jugador1_id: this.userService.getUserId(),
        jugador2_id: null,
        id: room.id
      }
      this.abrirSalaEspera(data)
    });

    this.websocketService.getWebSocketId().subscribe((user: any) => {
      this.userService.setUserId(user.id)
    });

    this.websocketService.getJoinedRoom().subscribe((room_response: any) => {
      console.log('joinedRoom',room_response)
      if(room_response.success == false) { return }

      

      const room: Room = room_response
      this.roomService.currentRoomId = room.id
      const data = {
        jugador1_id: room.jugador1_id,
        jugador2_id: room.jugador2_id,
        id: room.id
      }
      this.abrirSalaEspera(data)
    });
  }

  closeAllModals() {
    this.dialog.closeAll();
  }
}
