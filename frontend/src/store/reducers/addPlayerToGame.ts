import { createReducer } from '@reduxjs/toolkit';
import { addPlayer } from '../actions/addPlayerToGame'; // Import de l'action spécifique au jeu

// Définition de l'état initial pour l'action addPlayer
interface AddPlayerState {
  isPending: boolean;
  pseudo: string;
  game_id: number;
  gameId?: Number;
}

export const initialState: AddPlayerState = {
  isPending: false,
  pseudo: '',
  game_id: 0,
};

// Création du réducteur pour l'action addPlayer
const AddPlayerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPlayer.pending, (state) => {
      // L'action `pending` est déclenchée lorsqu'une requête est en cours
      state.isPending = true;
    })
    .addCase(addPlayer.fulfilled, (state) => {
      // L'action `fulfilled` est déclenchée lorsque la requête réussit
      state.isPending = false;
    })
    .addCase(addPlayer.rejected, (state) => {
      // L'action `rejected` est déclenchée lorsque la requête échoue
      state.isPending = false;
      // Vous pouvez gérer l'erreur ici si nécessaire
    });
});

export default AddPlayerReducer;
