import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button,
} from 'semantic-ui-react';
import './GamesList.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../@types/game';
import { RootState } from '../../store';
import { Character } from '../../@types/characterGames';

type GamesListProps = {
  gamesList: Game[];
  usersList: Character[];
  gm: boolean;
};

function GamesList({ gamesList, usersList, gm }: GamesListProps) {
  const { isPending } = useSelector((store: RootState) => store.gamesList);

  const navigate = useNavigate();

  const handleCharacterButtonClick = (characterId: number) => {
    navigate(`/character`, { state: { characterId: characterId } });
    localStorage.setItem('lastVisitedPage', location.pathname);
  };
  const handleGamesButtonClick = (gamesId: number) => {
    navigate('/gameDetails', { state: { gameId: gamesId } });
    localStorage.setItem('lastVisitedPage', location.pathname);
  };
  if (!Array.isArray(gamesList) || gamesList.length === 0) {
    return <div>Aucune partie disponible.</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <Table striped className="list">
      {!gm && (
        <Table
          striped
          className="gameslist"
          style={{
            textAlign: 'center',
            '@media only screen and (max-width: 450px)': { textAlign: 'left' },
          }}
        >
          <TableHeader className="game pomme">
            <TableRow>
              <TableHeaderCell>Nom de la partie</TableHeaderCell>
              <TableHeaderCell>Campagne</TableHeaderCell>
              <TableHeaderCell>Date de MàJ</TableHeaderCell>
              <TableHeaderCell>Statut</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody className="game">
            {gamesList.map((game) => (
              <TableRow key={game.id}>
                <TableCell>{game.name}</TableCell>
                <TableCell>{game.campaign}</TableCell>
                <TableCell>
                  {game.updatedAt
                    ? new Date(game.updatedAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {(() => {
                    switch (game.status_id) {
                      case 1:
                        return 'Actif';
                      case 2:
                        return 'En pause';
                      case 3:
                        return 'Archivée';
                      default:
                        return 'Statut inconnu';
                    }
                  })()}
                </TableCell>
                <TableCell>
                  <Button>
                    {game.status_id === 3 ? 'Rétablir' : 'Archiver'}
                  </Button>
                  {game.status_id === 1 && <Button>Jouer</Button>}
                  <Button onClick={() => handleGamesButtonClick(game.id)}>
                    Fiche partie
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {gm && (
        <Table
          striped
          className="charcterslist"
          style={{ textAlign: 'center' }}
        >
          <TableHeader className="game pomme">
            <TableRow className="game">
              <TableHeaderCell>Personnage</TableHeaderCell>
              <TableHeaderCell>Nom de la partie</TableHeaderCell>
              <TableHeaderCell>Campagne</TableHeaderCell>
              <TableHeaderCell>Date de MàJ</TableHeaderCell>
              <TableHeaderCell>Statut</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody className="game">
            {usersList.flat().map((character: Character) => (
              <TableRow key={character.id}>
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.game?.name}</TableCell>
                <TableCell>{character.game?.campaign} </TableCell>
                <TableCell>
                  {character.game && character.game.updatedAt
                    ? new Date(character.game.updatedAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {character.game?.status_id === 1 ? 'Archivée' : 'En pause'}
                </TableCell>
                <TableCell
                  style={{
                    '@media only screen and (max-width: 450px)': {
                      textAlign: 'center',
                    },
                  }}
                >
                  <Button
                    className="ui.button"
                    onClick={() => handleCharacterButtonClick(character.id)}
                  >
                    Fiche perso
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Table>
  );
}

export default GamesList;
