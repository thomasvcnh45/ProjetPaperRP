/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type GlobalDataState = {
  spells: any[];
  skills: any[];
  items: any[];
  isPending: boolean;
  classes: any[];
};

const initialState: GlobalDataState = {
  spells: [],
  skills: [],
  items: [],
  isPending: false,
  classes: [],
};

export const fetchSpellsList = createAsyncThunk(
  'globalData/spells',
  async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/spells');
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération de la liste des sorts',
        error
      );
      throw error;
    }
  }
);

export const fetchSkillsList = createAsyncThunk(
  'globalData/skills',
  async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/skills');
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération de la liste des compétences',
        error
      );
      throw error;
    }
  }
);

export const fetchItemsList = createAsyncThunk('globalData/items', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/items');
    return response.data;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération de la liste des objets',
      error
    );
    throw error;
  }
});
export const fetchClassList = createAsyncThunk('globalData/Class', async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/classes');
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Erreur lors de la récupération de la liste des objets',
      error
    );
    throw error;
  }
});

const globalDataSlice = createSlice({
  name: 'globaldata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpellsList.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchSpellsList.fulfilled, (state, action) => {
        state.isPending = false;
        state.spells = action.payload;
      })
      .addCase(fetchSpellsList.rejected, (state) => {
        state.isPending = false;
      })

      .addCase(fetchSkillsList.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchSkillsList.fulfilled, (state, action) => {
        state.isPending = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkillsList.rejected, (state) => {
        state.isPending = false;
      })

      .addCase(fetchItemsList.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchItemsList.fulfilled, (state, action) => {
        state.isPending = false;
        state.items = action.payload;
      })
      .addCase(fetchItemsList.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(fetchClassList.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchClassList.fulfilled, (state, action) => {
        state.isPending = false;
        state.classes = action.payload;
        console.log(state.classes);
      })
      .addCase(fetchClassList.rejected, (state) => {
        state.isPending = false;
      });
  },
});

export default globalDataSlice.reducer;
