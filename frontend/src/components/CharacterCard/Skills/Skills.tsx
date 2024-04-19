// import { useState } from 'react';
import { Button, Grid, GridColumn, Segment } from 'semantic-ui-react';
import './Skills.scss';
import { RiDeleteBin2Line } from 'react-icons/ri';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../../state/store';
import { Skill } from '../../../@types/character';
import {
  addSkillToCharacter,
  fetchCharacterData,
  removeSkillFromCharacter,
} from '../../../state/character/characterSlice';
import SkillsModal from './SkillsModal';

type SkillsProps = {
  skills: Skill[];
};

function Skills({ skills }: SkillsProps) {
  const iconSize = 20;
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useSelector((state: RootState) => state.character.data!);
  const [expandedSkillId, setExpandedSkillId] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 400;

  const handleAddSkill = (charId: number, skillId: number) => {
    dispatch(addSkillToCharacter({ charId, skillId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveSkill = (charId: number, skillId: number) => {
    dispatch(removeSkillFromCharacter({ charId, skillId }))
      .then(() => {
        dispatch(fetchCharacterData(id.toString()));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleSkill = (skillId: number) => {
    if (isMobile) {
      setExpandedSkillId((prevId) => (prevId === skillId ? null : skillId));
    }
  };

  return (
    <>
      <Grid stackable columns={2} relaxed="very" className="skills">
        <GridColumn>
          <Segment className="passive-skills">
            <h3 onClick={() => toggleSkill(-1)}>Compétences passives</h3>
            <div>
              <ul
                style={{
                  display:
                    expandedSkillId === -1 || !isMobile ? 'block' : 'none',
                }}
              >
                {skills
                  .filter((skill) => skill.is_active === false)
                  .map((skill) => (
                    <li className="skill" key={skill.id}>
                      <div className="skill">
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-description">{skill.note}</div>
                        <Button onClick={() => handleRemoveSkill(id, skill.id)}>
                          <RiDeleteBin2Line size={iconSize} />
                        </Button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Segment>
        </GridColumn>
        <GridColumn>
          <Segment>
            <h3 onClick={() => toggleSkill(-2)}>Compétences actives</h3>
            <div>
              <ul
                style={{
                  display:
                    expandedSkillId === -2 || !isMobile ? 'block' : 'none',
                }}
              >
                {skills
                  .filter((skill) => skill.is_active === true)
                  .map((skill) => (
                    <li className="skill" key={skill.id}>
                      <div className="skill">
                        <div className="skill-name">{skill.name}</div>
                        <div className="skill-description">{skill.note}</div>
                        <Button onClick={() => handleRemoveSkill(id, skill.id)}>
                          <RiDeleteBin2Line size={iconSize} />
                        </Button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Segment>
        </GridColumn>
      </Grid>
      <SkillsModal charId={id} onAddSkill={handleAddSkill} />
    </>
  );
}

export default Skills;
