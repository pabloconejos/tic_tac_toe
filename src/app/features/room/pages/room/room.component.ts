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
      this.roomService.currentRoom = room // TODO => AQUI PETA PORQUE LO QUE TENDRIA QUE SER UN ARRAY ES = ,,,,1,1,,,,1
    })
  }

  playMove(index: number): void {
    if (!this.roomService.currentRoom.board[index] && !this.winner && this.userService.marker === this.roomService.currentRoom.turn) {
      this.roomService.currentRoom.board[index] = this.roomService.currentRoom.turn;
      if (this.checkWinner()) {
        this.winner = this.roomService.currentRoom.turn;
      }
      this.roomService.updateBoard(this.roomService.currentRoom.board)
    }
  }

  // HACERLO EN EL BACK
  checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
      [0, 4, 8], [2, 4, 6]             // diagonales
    ];
    return winningCombinations.some(combination =>
      combination.every(index => this.roomService.currentRoom.board[index] === this.roomService.currentRoom.turn)
    );
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
