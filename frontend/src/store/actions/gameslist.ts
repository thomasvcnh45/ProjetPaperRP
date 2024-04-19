import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getGamesListAction = createAsyncThunk(
  'user/GAMESLIST',
  async (userId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}/games`
      );
      // https://rppaper-8fb3a2d31e69.herokuapp.com/users/1

      const gamesListData = response.data;

      return gamesListData;
    } catch (error) {
      console.error('Erreur lors de la requête de connexion :', error);

      throw error;
    }
  }
);
export type CreateGamePayload = {
  user_id: number;
};
export const CreateGameAction = createAsyncThunk(
  'user/CREATE_GAME',
  async (payload: CreateGamePayload) => {
    const Response = await axios.post(
      'http://localhost:3000/api/v1/game',
      payload
    );
    const createGameDate = await Response.data;
    return createGameDate;
  }
);

export default {
  getGamesListAction,
  CreateGameAction,
};
