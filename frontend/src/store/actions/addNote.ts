import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const addNote = createAsyncThunk(
  'note/AddNOTE',
  async (note: string, thunkAPI) => {
    try {
      const response = await axios.post('A definir', {
        note,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur lors de l'ajout de la note");
    }
  }
);

export default addNote;
