import { Component, OnInit } from '@angular/core';
import { IRoom, RoomPlayers } from '../../../../interfaces/Room';
import { MatDialog } from '@angular/material/dialog';
import { WaitingRoomComponent } from '../../../../shared/waiting-room/waiting-room.component';
import { Router } from '@angular/router';

import { ModalServiceService, WebsocketService, RoomService, UserService } from '@core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(
    private websocketService: WebsocketService,
    public roomService: RoomService,
    public userService: UserService,
    private dialog: MatDialog,
    private modalService: ModalServiceService,
    private router: Router) 
  {

  }

  ngOnInit() {
    this.listenEvents()
    this.websocketService.requestAvailableRooms();

    window.onbeforeunload = () => {
      if (!this.roomService.currentRoomId) { return }
      this.closeRoom(this.roomService.currentRoomId)
    };
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

      if (result?.tipo == "iniciar") {
        this.websocketService.startPlay(result?.roomId)
      }

      if (result?.tipo == 'close') {
        this.closeRoom(result?.roomId)
        this.handlerMessage('Abandonaste la partida')
        this.roomService.removeCurrentRoomId()
      }

      if (!result && !this.roomService.currentRoom) {
        this.handlerMessage('El otro jugador abandono la partida')
        this.roomService.removeCurrentRoomId()
      }
    });
  }

  listenEvents() {
    this.websocketService.onAvailableRooms().subscribe((rooms: IRoom[]) => {
      this.roomService.setRooms(rooms)
      if (!this.roomService.currentRoomId) {
        return
      }
      const e = rooms.filter((room: IRoom) => room.id == this.roomService.currentRoomId)
      console.log(e)
      if(e.length >= 1) {
        this.modalService.updateRoomData(e[0]); // ACTUALIZAR WAITING ROOM CUANDO SE UNE EL J1
      } else {
        this.closeAllModals()
      }

    });

    this.websocketService.onRoomCreated().subscribe((room: {id: string, romm: IRoom}) => {
      this.roomService.currentRoomId = room.id
      const data = {
        jugador1_id: this.userService.getUserId(),
        jugador2_id: null,
        id: room.id
      }
      this.abrirSalaEspera(data)
    });

    this.websocketService.getWebSocketId().subscribe((user: {id: string}) => {
      this.userService.setUserId(user.id)
    });

    this.websocketService.onRoomReadyToStart().subscribe((response: RoomPlayers) => {
      const room: IRoom = response.roomInfo
      this.roomService.currentRoomId = room.id
      const data = {
        jugador1_id: room.jugador1_id,
        jugador2_id: room.jugador2_id,
        id: room.id
      }
      this.modalService.updateRoomData(data);
    })

    this.websocketService.getJoinedRoom().subscribe((room: IRoom) => {
      this.abrirSalaEspera(room)
    })

    this.websocketService.onStartPlay().subscribe((room: IRoom) => {
      this.roomService.currentRoom = room
      this.closeAllModals()
      this.router.navigate(['/room', room.id]);

    })

    this.websocketService.onError().subscribe((error) => {
      console.error('Error recibido:', error.message);
    });
  }

  closeAllModals() {
    this.dialog.closeAll();
  }

  handlerMessage(message: string) {
    console.log(message)
  }
}
