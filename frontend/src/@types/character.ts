// import { Game } from './game';
import { User } from './user';

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

  stats: Stat[];
  classes: Class[];
  skills: Skill[];
  spells: Spell[];
  inventory: Item[];

  // game: Game;
  user?: User;
};

export type Stat = {
  id: number;
  name: string;
  value: number;
};

export type Class = {
  id: number;
  name: string;
  note: string;
};

export type Skill = {
  id: number;
  name: string;
  note: string;
  is_active: boolean;
};

export type Spell = {
  id: number;
  name: string;
  note: string;
};

export type Item = {
  id: number;
  name: string;
  note: string;
  is_equipped: boolean;
};

/* [
	{
		"id": 123,
		"name": "character1",
		"experience": 100,
		"level": 1,
		"health": 100,
		"user_id": 123,
		"game_id": 123,
		"createdAt": "2024-04-03T13:10:41.671Z",
		"updatedAt": "2024-04-03T13:10:41.671Z",
		"game": {
			"id": 123,
			"name": "Partie 1",
			"campaign": "Campagne 1",
			"status_id": 123,
			"note_id": 123,
			"user_id": 123,
			"createdAt": "2024-04-08T14:20:19.509Z",
			"updatedAt": null
		}
	}
] */
