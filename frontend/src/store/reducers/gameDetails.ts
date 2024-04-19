import { createReducer } from '@reduxjs/toolkit';
import { gameAction } from '../actions/gameDetails';
import { Game } from '../../@types/game';

interface GameState {
  isFetching: boolean;
  gameDetails: Game;
  gameId?: Number;
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
  gameId: 0,
};

export const GameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(gameAction.pending, (state) => {
      // request en cours
      state.isFetching = true;
    })
    .addCase(gameAction.fulfilled, (state, action) => {
      // request qui abouti
      state.isFetching = false;
      state.gameDetails = action.payload;
    })
    .addCase(gameAction.rejected, (state) => {
      // request failed
      state.isFetching = false;
    });
});

export default GameReducer;
