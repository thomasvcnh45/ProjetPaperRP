import { createAsyncThunk } from '@reduxjs/toolkit'; // Import de createAsyncThunk uniquement
import axios from 'axios';

export const gameAction = createAsyncThunk(
  'game/fetchGameDetails',
  async (gameId: string) => {
    try {
      const responseGameDetails = await axios.get(
        `http://localhost:3000/api/v1/games/${gameId}/characters`
      );
      return responseGameDetails.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export type UpdateGameActionPayload = {
  name?: string;
  campaign?: string;
};
export const updateGameAction = createAsyncThunk(
  'game/UPDATE_GAME',
  async ({
    gameId,
    payload,
  }: {
    gameId: string;
    payload: UpdateGameActionPayload;
  }) => {
    try {
      const responseUpdateGame = await axios.patch(
        `http://localhost:3000/api/v1/game/${gameId}`,
        payload
      );

      return responseUpdateGame.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
