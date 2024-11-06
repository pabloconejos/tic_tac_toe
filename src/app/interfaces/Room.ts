export interface Room {
    id: string;
    estado: 'waiting' | 'in_progress' | 'finished';
    turno: 1 | 2;
    tablero: string;
    jugador1_id?: string;
    jugador2_id?: string;
    fecha_creacion?: Date;
    ganador?: number;
}
  