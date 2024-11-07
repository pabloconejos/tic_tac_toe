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
export class HomeComponent implements OnInit, OnDestroy{

  constructor(
    private websocketService: WebsocketService,
    public roomService: RoomService,
    public userService: UserService,
    private dialog: MatDialog,
    private modalService: ModalServiceService) 
  {

  }
  ngOnDestroy(): void {
    this.closeRoom(this.roomService.currentRoomId)
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

      if (result?.iniciar) {
        
      }

      if (result?.tipo == 'close') {
        this.closeRoom(result?.roomId)
        this.handlerMessage('Abandonaste la partida')
        this.roomService.removeCurrentRoomId()
      }

      if (!result) {
        this.handlerMessage('El otro jugador abandono la partida')
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
        this.modalService.updateRoomData(e[0]); // ACTUALIZAR WAITING ROOM CUANDO SE UNE EL J1
      } else {
        this.closeAllModals()
      }

    });

    this.websocketService.onRoomCreated().subscribe((room: any) => {
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

    this.websocketService.onRoomReady().subscribe((response: any) => {
      const room: Room = response.roomInfo
      this.roomService.currentRoomId = room.id
      const data = {
        jugador1_id: room.jugador1_id,
        jugador2_id: room.jugador2_id,
        id: room.id
      }
      console.log('se abre')
      // TODO => SI ABRO AQUI LA WAITING ROOM EN EL CLIENTE QUE YA LA TIENE ABIERTA SE ABRE DOS VECES
      // this.abrirSalaEspera(data)
      this.modalService.updateRoomData(data);
    })
  }

  closeAllModals() {
    this.dialog.closeAll();
  }

  handlerMessage(message: string) {
    console.log(message)
  }
}
