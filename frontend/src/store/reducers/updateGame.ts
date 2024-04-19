import { createReducer } from '@reduxjs/toolkit';
import { updateGameAction } from '../actions/gameDetails';
import { Game } from '../../@types/game';

interface GameState {
  isFetching: boolean;
  gameDetails: Game;
}

export const initialState: GameState = {
  isFetching: false,
  gameDetails: {
    id: 0,
    name: '',
    campaign: '',
    status_id: 0,
    note_id: 0,
    user_id: 0,
    createdAt: '',
    updatedAt: '',
    characters: [],
  },
};

export const UpdateGameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateGameAction.pending, (state) => {
      // request en cours
      state.isFetching = true;
    })
    .addCase(updateGameAction.fulfilled, (state, action) => {
      // request qui abouti
      state.isFetching = false;
    })
    .addCase(updateGameAction.rejected, (state) => {
      // request failed
      state.isFetching = false;
      // Peut être rajouter une erreur ?
    });
});

export default UpdateGameReducer;
