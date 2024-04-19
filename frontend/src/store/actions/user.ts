import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type ILoginActionPayload = {
  pseudo: string;
  password: string;
};

export type ISignupActionPayload = {
  pseudo: string;
  password: string;
  passwordConfirm: string;
};

// --- Action pour s'inscrire
export const signupAction = createAsyncThunk(
  'user/SIGNUP',
  async (payload: ISignupActionPayload, { rejectWithValue }) => {
    try {
      const signupResponse = await axios.post(
        'http://localhost:3000/api/v1/register',
        payload
      );
      const newUserInfo = await signupResponse.data;
      return newUserInfo;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue({ message: error.response.data.message });
      }
      console.error('Erreur lors de la requête de création de compte :', error);
      throw error;
    }
  }
);

// --- Action pour se connecter
export const loginAction = createAsyncThunk(
  'user/LOGIN',
  async (payload: ILoginActionPayload) => {
    try {
      // --- On fait la requête HTTP sur l'endpoint pour se connecter
      const response = await axios.post(
        'http://localhost:3000/api/v1/login',
        payload
      );
      // https://rppaper-8fb3a2d31e69.herokuapp.com/users/1

      // --- On filtre la réponse pour ne garder que le body
      const { data } = response.data;

      // --- On retourne la réponse de l'API pour que l'action .fulfilled y ait accès
      // (le retour du thunk devient le payload du fulfilled)
      return {
        id: data.id,
        pseudo: data.pseudo,
        token: response.data.token,
        username: data.pseudo,
        message: response.data.message,
      };
    } catch (error) {
      // Lancer une nouvelle erreur pour être gérée par le reducer
      throw error;
    }
  }
);
// --- Action pour se connecter  webtoken
export const autoLogIn = createAsyncThunk('USER/AUTO_LOGIN', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/verify-token',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        id: response.data.user.id,
        pseudo: response.data.user.pseudo,
        token: token,
        username: response.data.user.pseudo,
      };
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('Token non trouvé, authentification requise');
  }
});
/// --- Action pour se déconnecter
export const logOutAction = createAction('user/DISCONNECT');

export default {
  autoLogIn,
  loginAction,
  logOutAction,
  signupAction,
};
