import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserCharactersListAction = createAsyncThunk(
  'user/CHARACTERLIST',
  async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}/characters`
      );
      // https://rppaper-8fb3a2d31e69.herokuapp.com/users/1

      const charactersListData = response.data;

      return charactersListData;
    } catch (error) {
      throw error;
    }
  }
);
export default {
  getUserCharactersListAction,
};
