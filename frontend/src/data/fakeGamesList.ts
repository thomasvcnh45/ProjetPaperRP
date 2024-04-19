import { Game } from '../@types/game';

const fakeGamesList: Game[] = [
  {
    id: 1,
    name: 'Strahd 1',
    campaign: 'La Malédiction de Strahd',
    status_id: 1,
    user_id: 1,
    created_at: new Date(2020, 1, 1),
    updated_at: new Date(2023, 12, 18),
  },

  {
    id: 2,
    name: 'ToA',
    campaign: 'Tomb of Annihilation',
    status_id: 0,
    user_id: 1,
    created_at: new Date(2020, 1, 1),
    updated_at: new Date(2021, 11, 6),
  },
  {
    id: 3,
    name: 'OotA avec les boyz',
    campaign: 'Out of the Abyss',
    status_id: 0,
    user_id: 1,
    created_at: new Date(2020, 1, 1),
    updated_at: new Date(2021, 7, 23),
  },
  {
    id: 4,
    name: 'Jecépa',
    campaign: 'Storm King’s Thunder',
    status_id: 1,
    user_id: 2,
    created_at: new Date(2020, 1, 1),
    updated_at: new Date(2020, 4, 12),
  },
  {
    id: 5,
    name: 'Jecépa',
    campaign: 'Storm King’s Thunder',
    status_id: 0,
    user_id: 3,
    created_at: new Date(2020, 1, 1),
    updated_at: new Date(2020, 4, 12),
  },
  {
    id: 6,
    name: 'Jecépa',
    campaign: 'Storm King’s Thunder',
    status_id: 0,
    user_id: 4,
    created_at: new Date(2020, 1, 1),
    updated_at: new Date(2020, 4, 12),
  },
];

export default fakeGamesList;
