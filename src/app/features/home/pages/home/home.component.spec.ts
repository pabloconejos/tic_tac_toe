import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from '@core/services';
import { IRoom } from 'src/app/interfaces/Room';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {

    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserId']);
    userServiceSpy.getUserId.and.returnValue('123');  // Simula que el userId existe

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        TranslateService],
      imports: [
        TranslateModule.forRoot(),  // Importa el SharedModule aquí
        SharedModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createRoom with the user ID when the "create new room" button is clicked', () => {
    spyOn(component, 'createRoom');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.create-room-button');
    button.click();
    expect(component.createRoom).toHaveBeenCalled();
  });

  it('should call joinRoom with the room ID when the join button is clicked', () => {
    spyOn(component, 'joinRoom'); 
    
    const room: IRoom = {
      id: '123',
      state: 'waiting',
      turn: 'X',
      board: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      jugador1_id: 'player1',
      jugador2_id: 'player2',
      date_creation: new Date(),
      winner: ''
    };
    
    spyOn(component.roomService, 'getRooms').and.returnValue([room]);
  
    fixture.detectChanges();
  
    const button = fixture.debugElement.nativeElement.querySelector('.join-room-button');
    button.click();  // Simula el clic en el botón
  
    expect(component.joinRoom).toHaveBeenCalledWith(room.id);
  });
  
});
