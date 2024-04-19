import { createReducer } from '@reduxjs/toolkit';
import userActions from '../actions/user';

interface UserState {
  gm: boolean;
  isPending: boolean;
  logged: boolean;
  pseudo: string | undefined;
  username?: string;
  token?: string;
  id: number;
  errorMessage: string;
}
export const initialState: UserState = {
  isPending: false,
  logged: false,
  pseudo: '',
  username: '',
  token: '',
  id: 0,
  gm: false,
  errorMessage: '',
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userActions.loginAction.pending, (state) => {
      state.isPending = true;
      state.logged = false;
    })
    .addCase(userActions.loginAction.fulfilled, (state, action) => {
      state.isPending = false;
      state.logged = true;
      state.pseudo = action.payload.pseudo;
      state.username = action.payload.username;
      state.id = action.payload.id;
      const { token } = action.payload;
      // const token = `Bearer ${tokenpayload}`;
      localStorage.setItem('token', token);
    })
    .addCase(userActions.loginAction.rejected, (state) => {
      state.isPending = false;
      state.logged = false;
      state.id = 0;
      console.error('ERREUR DE CONNEXION');
    })
    .addCase(userActions.autoLogIn.pending, (state) => {
      console.info('autoLogIn Connexion en cours...');
      state.isPending = true;
      state.logged = false;
    })
    .addCase(userActions.autoLogIn.fulfilled, (state, action) => {
      state.isPending = false;
      state.logged = true;
      if (action.payload) {
        state.pseudo = action.payload.pseudo;
        state.username = action.payload.username;
        state.id = action.payload.id;
      } else {
        console.error("Payload de l'action autoLogIn non défini");
      }
    })
    .addCase(userActions.autoLogIn.rejected, (state) => {
      state.isPending = false;
      state.logged = false;
      state.id = 0;
    })

    .addCase(userActions.signupAction.fulfilled, () => {})
    .addCase(userActions.signupAction.rejected, () => {})
    .addCase(userActions.logOutAction, (state) => {
      localStorage.removeItem('token');

      return initialState;
    });
});

export default userReducer;
