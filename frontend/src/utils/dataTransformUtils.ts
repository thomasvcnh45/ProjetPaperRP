/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Character,
  Class,
  Item,
  Skill,
  Spell,
  Stat,
} from '../@types/character';

function mapApiDataToCharacter(apiData: any): Character {
  const {
    id,
    name,
    experience,
    level,
    health,
    background,
    note,
    user_id,
    game_id,
    createdAt,
    updatedAt,
    stats,
    classes,
    skills,
    spells,
    inventories,
  } = apiData;

  // Transformation des stats
  const mappedStats: Stat[] = stats.map((stat: any) => ({
    id: stat.id,
    name: stat.name,
    value: stat.char_has_stat.value,
  }));

  // Transformation des classes
  const mappedClasses: Class[] = classes.map((cls: any) => ({
    id: cls.id,
    name: cls.name,
    note: cls.note,
  }));

  // Transformation des compétences
  const mappedSkills: Skill[] = skills.map((skill: any) => ({
    id: skill.id,
    name: skill.name,
    note: skill.note,
    is_active: skill.is_active,
  }));

  // Transformation des sorts
  const mappedSpells: Spell[] = spells.map((spell: any) => ({
    id: spell.id,
    name: spell.name,
    note: spell.note,
  }));

  // Transformation des inventaires
  const mappedInventory: Item[] = inventories.map((item: any) => ({
    id: item.id,
    name: item.name,
    note: item.note,
    is_equipped: item.CharPossessesInventory.is_equipped,
  }));

  // Construction de l'objet Character
  const character: Character = {
    id,
    name,
    experience,
    level,
    health,
    background,
    note,
    user_id,
    game_id,
    createdAt,
    updatedAt,
    stats: mappedStats,
    classes: mappedClasses,
    skills: mappedSkills,
    spells: mappedSpells,
    inventory: mappedInventory,
  };
  return character;
}

export default mapApiDataToCharacter;
