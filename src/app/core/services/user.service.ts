import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private webSocketUserId!: string

  constructor() { }

  setUserId(id: string) {
    this.webSocketUserId = id
  }
  

  getUserId():string {
    return this.webSocketUserId
  }
}
