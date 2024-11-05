import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit{

  room: string | undefined;
  constructor(
    private router: ActivatedRoute, 
    private cookieService: CookieService) 
  {

  }
  ngOnInit(): void {
    this.room = this.router.snapshot.paramMap.get('id') ?? ''
    this.cookieService.set('tic_tac_toe-room', this.room)
  }

}
