import { createReducer } from '@reduxjs/toolkit';
import UserCharactersActions from '../actions/charactereUserList';
import { Character } from '../../@types/characterGames';

interface UserCharactersListState {
  characters: any;
  isPending: boolean;
  UserCharactersListData: Character[];
  gameId?: Number;
}
export const initialState: UserCharactersListState = {
  isPending: false,
  UserCharactersListData: [],
  characters: {},
};
const UserCharactersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      UserCharactersActions.getUserCharactersListAction.pending,
      (state) => {
        state.isPending = true;
      }
    )
    .addCase(
      UserCharactersActions.getUserCharactersListAction.fulfilled,
      (state, action) => {
        state.isPending = false;
        state.UserCharactersListData = action.payload;
      }
    )
    .addCase(
      UserCharactersActions.getUserCharactersListAction.rejected,
      (state) => {
        state.isPending = false;
      }
    );
});

export default UserCharactersReducer;
