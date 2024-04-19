import { Character } from './character';

export type Game = {
  id: number;
  name: string;
  campaign: string;
  status_id: number;
  note_id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  characters?: Character[];
};
