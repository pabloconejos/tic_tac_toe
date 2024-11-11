import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguajeService {

  private selectedLanguaje: string = 'en'

  constructor() { }

  setSelectedLanguaje(len: string) {
    this.selectedLanguaje = len;
  }

  getSelectedLanguaje(): string {
    return this.selectedLanguaje;
  }

}
