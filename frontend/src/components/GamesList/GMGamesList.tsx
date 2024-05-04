import React, { useEffect, useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import GamesList from './GamesList';
import { AppDispatch, RootState } from '../../store';
import {
  CreateGameAction,
  getGamesListAction,
} from '../../store/actions/gameslist';
import characterUserListActions from '../../store/actions/charactereUserList';
import { useNavigate } from 'react-router-dom';
import './GMGamesList.scss';
type GMGamesListProps = {
  gm: boolean;
};

const GMGamesList: React.FC<GMGamesListProps> = ({ gm }) => {
  const dispatch: AppDispatch = useDispatch();
  const { id, logged } = useSelector((store: RootState) => store.user);
  const { gamesListData, isPending } = useSelector(
    (state: RootState) => state.gamesList
  );
  const { UserCharactersListData } = useSelector(
    (state: RootState) => state.UserCharacters
  );

  useEffect(() => {
    if (logged) {
      dispatch(getGamesListAction(id));
      dispatch(characterUserListActions.getUserCharactersListAction(id));
    }
  }, [dispatch, id, logged]);

  const handleCreateGame = () => {
    dispatch(CreateGameAction({ user_id: id }))
      .then(() => {
        dispatch(getGamesListAction(id));
      })
      .catch((error) => {
        console.error('Erreur lors de la création de la partie :', error);
      });
  };

  const filterGamesByStatus = (statusId: number) => {
    return gamesListData.games.filter((game) => game.status_id === statusId);
  };

  const filterUsersByGameStatus = (statusId: number) => {
    return UserCharactersListData.filter(
      (user) => user.game && user.game.status_id === statusId
    );
  };

  const panes = [
    {
      menuItem: 'Toutes',
      pane: (
        <Tab.Pane key="tabpane3">
          <GamesList
            gamesList={gamesListData.games}
            gm={!gm}
            usersList={UserCharactersListData}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Actif',
      pane: (
        <Tab.Pane key="tabpane4">
          <GamesList
            gamesList={filterGamesByStatus(1)}
            gm={!gm}
            usersList={filterUsersByGameStatus(1)}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'En pause',
      pane: (
        <Tab.Pane key="tabpane5">
          <GamesList
            gamesList={filterGamesByStatus(2)}
            gm={!gm}
            usersList={filterUsersByGameStatus(2)}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Archivé',
      pane: (
        <Tab.Pane key="tabpane6">
          <GamesList
            gamesList={filterGamesByStatus(3)}
            gm={!gm}
            usersList={filterUsersByGameStatus(3)}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <>
          <Tab panes={panes} renderActiveOnly={false} gm={gm} />
          {gm && (
            <Button className="newGame" onClick={handleCreateGame}>
              Nouvelle partie
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default GMGamesList;
