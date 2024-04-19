import axios from 'axios';

export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const loadUserData = (userId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/notes`);
      dispatch({
        type: LOAD_USER_DATA,
        payload: response.data,
      });
    } catch (error) {
      // Handle error
    }
  };
};

export const saveUserData = (userId: string, data: string) => {
  return async (dispatch: any) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/note`, { value: data });
      dispatch({
        type: SAVE_USER_DATA,
        payload: { userId, data },
      });
    } catch (error) {
      // Gestion d erreur
    }
  };
};
