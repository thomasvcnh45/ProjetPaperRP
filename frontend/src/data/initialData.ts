import { Character } from '../@types/character';

const initialCharData: Character = {
  id: 0,
  name: 'Personnage',
  experience: 0,
  level: 0,
  health: 0,
  background: '',
  note: '',

  user_id: 0,
  game_id: 0,
  createdAt: '',
  updatedAt: '',

  stats: [
    { id: 1, name: 'Force', value: 0 },
    { id: 2, name: 'Dextérité', value: 0 },
    { id: 3, name: 'Constitution', value: 0 },
    { id: 4, name: 'Intelligence', value: 0 },
    { id: 5, name: 'Sagesse', value: 0 },
    { id: 6, name: 'Charisme', value: 0 },
    { id: 7, name: "Capacité d'Armure", value: 0 },
  ],
  classes: [{ id: 0, name: 'Classe', note: '' }],
  skills: [{ id: 0, name: '', note: '', is_active: false }],
  spells: [{ id: 0, name: '', note: '' }],
  inventory: [{ id: 0, name: '', note: '', is_equipped: false }],
};

export default initialCharData;
