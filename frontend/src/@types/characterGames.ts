export type Character = {
  id: number;
  name: string;
  experience: number;
  level: number;
  health: number;
  background: string;
  note: string;

  user_id: number;
  game_id: number;
  createdAt: string;
  updatedAt: string;
  game: Game;
};

export type Game = {
  id: number;
  name: string;
  campaign: string;
  status_id: number;
  note_id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
};
