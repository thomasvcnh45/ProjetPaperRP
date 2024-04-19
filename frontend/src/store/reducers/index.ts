import userReducer from './user';
import gamesListReducer from './gameslist';
import UserCharactersReducer from './charactereUserList';
import GameReducer from './gameDetails';
import AddPlayer from './addPlayerToGame';
const reducer = {
  user: userReducer,
  gamesList: gamesListReducer,
  UserCharacters: UserCharactersReducer,
  GameReducerTry: GameReducer,
  addPlayer: AddPlayer,
};

export default reducer;
