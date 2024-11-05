export interface Room {
    id: string;
    estado: 'waiting' | 'in_progress' | 'finished';
    turno: 1 | 2;
    tablero: string;
    jugador1_id?: number;
    jugador2_id?: number;
    fecha_creacion?: Date;
    ganador?: number;
  }
  