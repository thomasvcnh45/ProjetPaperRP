import { Button, Segment } from 'semantic-ui-react';
import './Spells.scss';
import { RiDeleteBin2Line } from 'react-icons/ri';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { Spell } from '../../../@types/character';
import SpellsModal from './SpellsModal';
import { AppDispatch, RootState } from '../../../state/store';
import {
  addSpellToCharacter,
  fetchCharacterData,
  removeSpellFromCharacter,
} from '../../../state/character/characterSlice';

type SpellsProps = {
  spells: Spell[];
};

function Spells({ spells }: SpellsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootState) => state.character.data!);

  const handleAddSpell = (charId: number, spellId: number) => {
    dispatch(addSpellToCharacter({ charId, spellId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveSpell = (charId: number, spellId: number) => {
    dispatch(removeSpellFromCharacter({ charId, spellId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Segment className="spells">
      {spells.length === 0 ? <div>Apprenez des sorts !</div> : null}
      <ul>
        {spells.map((spell) => (
          <li className="spell" key={spell.id}>
            <div className="spell-name">{spell.name}</div>
            <div className="spell-notes">{spell.note}</div>
            <Button onClick={() => handleRemoveSpell(id, spell.id)}>
              <RiDeleteBin2Line size={20} />
            </Button>
          </li>
        ))}
      </ul>
      <SpellsModal charId={id} onAddSpell={handleAddSpell} />
    </Segment>
  );
}

export default Spells;
