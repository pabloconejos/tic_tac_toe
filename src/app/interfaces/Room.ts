export interface IRoom {
    id: string;
    state: 'waiting' | 'in_progress' | 'finished';
    turn: 'X' | 'O';
    board: string[];
    jugador1_id?: string;
    jugador2_id?: string;
    date_creation?: Date;
    winner?: string;
}
  
export interface RoomPlayers {
    roomId: string,
    players: string[],
    roomInfo: IRoom,
}