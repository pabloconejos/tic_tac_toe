import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService, UserService } from '@core/services';
import { CookieService } from 'ngx-cookie-service';
import { WebsocketService } from '../../../../core/services/websocket.service';
import { IRoom } from 'src/app/interfaces/Room';

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
    private websocketService: WebsocketService) 
  {

  }

  ngOnInit(): void {
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


}
