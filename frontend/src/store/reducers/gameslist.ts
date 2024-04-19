import { createReducer } from '@reduxjs/toolkit';
import { getGamesListAction, CreateGameAction } from '../actions/gameslist';
import { Game } from '../../@types/characterGames';

interface GamesState {
  gm: boolean;
  games: any;
  isPending: boolean;
  gameId?: number;
  gamesListData: { id: string; pseudo: string; games: Game[] };
}
export const initialState: GamesState = {
  isPending: false,
  gamesListData: { id: '', pseudo: '', games: [] },
  games: {},
  gm: false,
};
const GamesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(CreateGameAction.pending, (state) => {
      state.isPending = true;
    })
    .addCase(CreateGameAction.fulfilled, (state, action) => {
      state.isPending = false;
      state.gm = false;
      state.games = action.payload;
    })
    .addCase(CreateGameAction.rejected, (state) => {
      state.isPending = false;
    })

    .addCase(getGamesListAction.pending, (state) => {
      state.isPending = true;
    })
    .addCase(getGamesListAction.fulfilled, (state, action) => {
      state.isPending = false;
      state.gm = false;
      state.gamesListData = action.payload;
    })
    .addCase(getGamesListAction.rejected, (state) => {
      state.isPending = false;
    });
});

export default GamesReducer;
