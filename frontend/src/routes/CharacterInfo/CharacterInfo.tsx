import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { Input, Segment, Tab } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import Classes from '../../components/CharacterCard/Classe/Classe';
import Spells from '../../components/CharacterCard/Spells/Spells';
import Stats from '../../components/CharacterCard/Stats/Stats';
import Background from '../../components/CharacterCard/Background/Background';
import Skills from '../../components/CharacterCard/Skills/Skills';
import Inventory from '../../components/CharacterCard/Inventory/Inventory';
import './CharacterInfo.scss';
import { AppDispatch, RootState } from '../../state/store';
import {
  fetchCharacterData,
  updateCharacterBackground,
  updateCharacterInfo,
  updateCharacterNote,
} from '../../state/character/characterSlice';
import {
  fetchClassList,
  fetchItemsList,
  fetchSkillsList,
  fetchSpellsList,
} from '../../state/character/globalDataSlice';
import Classe from '../../components/CharacterCard/Classe/Classe';

function CharacterInfo() {
  const location = useLocation();
  const characterId = location.state?.characterId;
  const id = characterId;

  const dispatch = useDispatch<AppDispatch>();
  const characterData = useSelector((state: RootState) => state.character.data);
  const [name, setName] = useState<string>(characterData?.name || '');
  useEffect(() => {
    if (characterData) {
      setName(characterData.name || '');
    }
  }, [characterData]);
  useEffect(() => {
    dispatch(fetchSpellsList());
    dispatch(fetchSkillsList());
    dispatch(fetchItemsList());
    dispatch(fetchClassList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCharacterData(id!));
  }, [dispatch, id]);

  const handleBackgroundChange = (newBackground: string) => {
    dispatch(
      updateCharacterBackground({ characterId: id!, background: newBackground })
    );
  };

  const handleChangeNotes = (newNote: string) => {
    dispatch(updateCharacterNote({ characterId: id!, note: newNote }));
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    dispatch(
      updateCharacterInfo({
        characterId: id,
        name: newName,
      })
    );
  };
  const handleChangeLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateCharacterInfo({
        characterId: id,
        level: parseInt(event.target.value, 10),
      })
    );
  };
  const handleChangeExperience = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      updateCharacterInfo({
        characterId: id,
        experience: parseInt(event.target.value),
      })
    );
  };

  const panes = [
    {
      menuItem: 'Stats',
      pane: (
        <Tab.Pane key="stats">
          <Classe classes={characterData!.classes} />
          <Stats
            stats={characterData!.stats}
            note={characterData!.note}
            charId={characterData!.id}
            onChangeNotes={handleChangeNotes}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Sorts',
      pane: (
        <Tab.Pane key="spells">
          <Spells spells={characterData!.spells} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Compétences',
      pane: (
        <Tab.Pane key="skills">
          <Skills skills={characterData!.skills} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Inventaire',
      pane: (
        <Tab.Pane key="inventory">
          <Inventory items={characterData!.inventory} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Renseignements',
      pane: (
        <Tab.Pane key="background">
          <Background
            background={characterData!.background}
            onBackgroundChange={handleBackgroundChange}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Segment className="character-info">
        <span className="character-name">Nom : </span>
        <Input id="name" value={name} onChange={handleChangeName} />
        <span className="character-class">Classe : </span>
        <Input
          id="classes"
          value={
            characterData && characterData.classes && characterData.classes[0]
              ? characterData.classes[0].name
              : 'noob'
          }
        />
        <span className="character-level">Niv. : </span>
        <Input
          id="level"
          value={characterData?.level !== null ? characterData?.level : 0}
          onChange={handleChangeLevel}
        />
        <Input
          id="experience"
          value={characterData?.experience}
          onChange={handleChangeExperience}
        />
        <span className="character-xp"> pts xp</span>
      </Segment>
      <Segment>
        <Tab panes={panes} className="scrollbar" renderActiveOnly={false} />
      </Segment>
    </>
  );
}

export default CharacterInfo;
