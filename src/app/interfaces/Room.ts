export interface IRoom {
    id: string;
    state: 'waiting' | 'in_progress' | 'finished';
    turn: 'X' | 'O';
    board: string[];
    jugador1_id?: string;
    jugador2_id?: string;
    date_creation?: Date;
    winner?: number;
}
  
export interface RoomPlayers {
    roomId: string,
    players: string[],
    roomInfo: IRoom,
}