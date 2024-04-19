import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type IAddPlayerPayload = {
  pseudo: string;
  game_id: number;
};

export const addPlayer = createAsyncThunk(
  'game/ADD_PLAYER',
  async (payload: IAddPlayerPayload) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/game/character/associate/game/user',
        payload
      );
      const { AddplayerData } = response.data;

      return {
        AddplayerData,
      };
    } catch (error) {
      console.error('Erreur lors de l ajout du joueur :', error);
      throw error;
    }
  }
);
// export const CreateGameAction = createAsyncThunk(
//   'user/CREATE_GAME',
//   async (payload: CreateGamePayload) => {
//     const Response = await axios.post(
//       'http://localhost:3000/api/v1/game',
//       payload
//     );
//     const createGameDate = await Response.data;
//     return createGameDate;
//   }
// );
export default addPlayer;
