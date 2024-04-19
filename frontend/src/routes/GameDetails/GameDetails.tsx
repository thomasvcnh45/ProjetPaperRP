import { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Loader,
  Dimmer,
  TableCell,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableBody,
  Table,
} from 'semantic-ui-react';
import './GameDetails.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InvitationForm from '../../components/Modal/GameDetailsModal/InvitationForm';
import LogbookModal from '../../components/Modal/LogbookModal/Logbook';
import invitationAction from '../../store/actions/addPlayerToGame';
import { AppDispatch, RootState } from '../../store';
import { gameAction, updateGameAction } from '../../store/actions/gameDetails';

function GameDetails() {
  const location = useLocation();
  const gameId = location.state?.gameId;
  const id = gameId;
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState('En pause');
  const [usernameInvitation, setUsernameInvitation] = useState('');
  const nomBidon = useSelector((state: RootState) => state.GameReducerTry);
  const gameInfo = nomBidon.gameDetails;
  const charactersArray = nomBidon.gameDetails?.characters;
  const { isFetching } = nomBidon;
  const navigate = useNavigate();

  const { logged } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    if (!logged) {
      navigate(`/`);
    }
  }, [logged]);
  useEffect(() => {
    dispatch(gameAction(id!));
  }, [dispatch, id]);

  useEffect(() => {
    if (gameInfo) {
      setUpdatedName(gameInfo.name);
      setUpdatedCampaign(gameInfo.campaign);
    }
  }, [gameInfo]);

  const handleCharacterButtonClick = (characterId: number) => {
    navigate(`/character`, { state: { characterId: characterId } });

    localStorage.setItem('lastVisitedPage', location.pathname);
    console.log(characterId);
  };

  const toggleStatus = () => {
    setStatus(status === 'Archivé' ? 'En cours' : 'Archivé');
  };

  const retrunUserPage = () => {
    navigate('/user', { state: { gm: true } });
  };

  const handleInvitation = () => {
    const gameId = parseInt(id!);
    const pseudo = usernameInvitation;
    dispatch(invitationAction({ game_id: gameId, pseudo })).then(() => {
      dispatch(gameAction(id!));
    });
  };

  const changeField = (value: string) => {
    setUsernameInvitation(value);
  };

  const [updatedName, setUpdatedName] = useState('');
  const [updatedCampaign, setUpdatedCampaign] = useState('');

  const handleFieldChange = (fieldName: string, value: string) => {
    if (fieldName === 'name') {
      setUpdatedName(value);
    } else if (fieldName === 'campaign') {
      setUpdatedCampaign(value);
    }
  };

  const handleSaveChanges = () => {
    const updatedPayload = {
      gameId: id!,
      payload: {
        name: updatedName,
        campaign: updatedCampaign,
      },
    };

    dispatch(updateGameAction(updatedPayload));
  };

  return (
    <Table striped className="list">
      <Button onClick={retrunUserPage}>Retour</Button>
      <Table className="game-details-container">
        <TableHeader className="Game" style={{ textAlign: 'center' }}>
          <TableRow>
            <TableHeaderCell>Nom de la partie</TableHeaderCell>
            <TableHeaderCell>Campagne</TableHeaderCell>
            <TableHeaderCell>
              <LogbookModal />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody className="Game" style={{ textAlign: 'center' }}>
          <TableRow>
          <TableCell className="list-item">
            <input
              value={updatedName}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
          </TableCell>
          <TableCell className="list-item">
            <input
              value={updatedCampaign}
              onChange={(e) => handleFieldChange('campaign', e.target.value)}
            />
          </TableCell>
          <Button onClick={handleSaveChanges}>Enregistrer</Button>
          </TableRow>
        </TableBody>
      </Table>
      <Table striped className="gameslist">
        <Dimmer active={isFetching}>
          <Loader />
        </Dimmer>

        <TableHeader className="game bob" style={{ textAlign: 'center' }}>
          <TableRow>
            <TableHeaderCell>Joueurs</TableHeaderCell>
            <TableHeaderCell>Personnages</TableHeaderCell>
            <TableHeaderCell>Date MAJ</TableHeaderCell>
            <TableHeaderCell>Statut</TableHeaderCell>
            <TableHeaderCell>Campagne</TableHeaderCell>
            <TableHeaderCell />
          </TableRow>
        </TableHeader>
        <TableBody className="Game" style={{ textAlign: 'center' }}>
          {charactersArray &&
            charactersArray!.map((character) => (
              <TableRow key={character.id}>
                <TableCell className="list-item">
                  {character!.user!.pseudo}
                </TableCell>
                <TableCell className="list-item">{character.name}</TableCell>
                <TableCell className="list-item">
                  {character.updatedAt
                    ? new Date(character.updatedAt).toLocaleDateString()
                    : new Date().toLocaleDateString()}
                </TableCell>
                <TableCell className="list-item">{status}</TableCell>
                <TableCell className="list-item">
                  <Button onClick={toggleStatus}>Archiver / Désarchiver</Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleCharacterButtonClick(character.id)}
                  >
                    Fiche perso
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>

        <Button className="invitation-button-container">
          <InvitationForm
            handleInvitation={handleInvitation}
            usernameInvitation={usernameInvitation}
            changeField={changeField}
          />
        </Button>
      </Table>
    </Table>
  );
}

export default GameDetails;
