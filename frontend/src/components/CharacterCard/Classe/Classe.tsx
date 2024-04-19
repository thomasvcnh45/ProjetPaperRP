import { Button, Header, Segment, TextArea } from 'semantic-ui-react';
import './Classe.scss';
import { RiDeleteBin2Line } from 'react-icons/ri';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { Class } from '../../../@types/character';
import ClasseModal from './ClasseModal';
import { AppDispatch, RootState } from '../../../state/store';
import {
  addClassToCharacter,
  fetchCharacterData,
  removeClassFromCharacter,
} from '../../../state/character/characterSlice';
import React from 'react';

type ClassProps = {
  classes: Class[];
};

function Classes({ classes }: ClassProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootState) => state.character.data!);

  const handleAddClass = (charId: number, classId: number) => {
    dispatch(addClassToCharacter({ charId, classId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveClass = (charId: number, classId: number) => {
    dispatch(removeClassFromCharacter({ charId, classId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Segment className="Class">
      <Header as="h4">Classe</Header>

      {classes.length === 0 ? (
        <div>Choisie une classe ! Et ton destin !</div>
      ) : null}
      <ul>
        {classes.map((classe) => (
          <li className="Class" key={classe.id}>
            <div className="classe-name">{classe.name}</div>
            <div className="classe-notes">{classe.note}</div>
            <Button onClick={() => handleRemoveClass(id, classe.id)}>
              <RiDeleteBin2Line size={20} />
            </Button>
          </li>
        ))}
      </ul>
      <ClasseModal charId={id} onAddSpell={handleAddClass} />
    </Segment>
  );
}

export default Classes;
