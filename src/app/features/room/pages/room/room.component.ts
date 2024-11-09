import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService, UserService } from '@core/services';
import { CookieService } from 'ngx-cookie-service';
import { WebsocketService } from '../../../../core/services/websocket.service';
import { IRoom } from 'src/app/interfaces/Room';
import { MatDialog } from '@angular/material/dialog';
import { WinnerModalComponent } from 'src/app/shared/winner-modal/winner-modal.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{

  winner: string | null = null;

  constructor(
    private cookieService: CookieService,
    public roomService: RoomService,
    private userService: UserService,
    private websocketService: WebsocketService,
    private router: Router,
    private dialog: MatDialog) 
  {

  }

  ngOnInit(): void {
    if (!this.roomService.currentRoom) {
      this.router.navigate(['/home']);
    }

    const room = this.roomService.currentRoom.id
    this.cookieService.set('tic_tac_toe-room', room)
    console.log(this.roomService.currentRoom)
    this.roomService.initBoard()
    this.listenEvents()
  }
  
  listenEvents() {
    this.websocketService.onUpdateBoard().subscribe((room: IRoom) => {
      console.log(room)
      this.roomService.currentRoom = room

      if (this.roomService.currentRoom.winner) {
        let data;
        console.log(this.roomService.currentRoom.winner + ' === ' + this.getPlayer())
        if (this.roomService.currentRoom.winner === this.getPlayer()) {
          data = { winner: true, message: '¡Felicitaciones! Has ganado la partida.'}
        } else {
          data = { winner: false, message: 'Perdiste :( El otro jugador ganado la partida.'}
        }
        this.openModal(data)
      }
    })

    this.websocketService.roomClosed().subscribe((roomId: string) => {
      const data = { winner: true, message: '¡Ganaste! El otro jugador abandono la partida.'}
      this.openModal(data)
    })
  }

  playMove(index: number): void {
    if (!this.roomService.currentRoom.board[index] && !this.roomService.currentRoom.winner && this.userService.marker === this.roomService.currentRoom.turn) {
      this.roomService.currentRoom.board[index] = this.roomService.currentRoom.turn;
      this.roomService.updateBoard(this.roomService.currentRoom)
    }
  }


  getPlayer() {
    if (this.userService.getUserId() == this.roomService.currentRoom.jugador1_id) {
      this.userService.marker = 'X'
      return 'X'
    }

    this.userService.marker = 'O'
    return 'O'
    
  }

  openModal(data: {winner: boolean, message: string}) {
    const dialogRef = this.dialog.open(WinnerModalComponent, {
      disableClose: true,
      data
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result?.tipo == "home") {
        this.router.navigate(['/home']);
        this.websocketService.closeRoom(this.roomService.currentRoom.id); // al cerrar la sala como que se recarga la pagina
      }

      
    });
   
  }

}
