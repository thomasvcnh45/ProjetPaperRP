import { LOAD_USER_DATA, SAVE_USER_DATA } from '../actions/logBook';

const initialState: Record<string, string[]> = {};

const userReducer = (action: any, state = initialState) => {
  switch (action.type) {
    case LOAD_USER_DATA:
      return state;

    case SAVE_USER_DATA: {
      const { userId, data } = action.payload;
      return {
        ...state,
        [userId]: data,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
