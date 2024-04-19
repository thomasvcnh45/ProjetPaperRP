/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Character } from '../../@types/character';
import mapApiDataToCharacter from '../../utils/dataTransformUtils';
import initialCharData from '../../data/initialData';

type CharacterState = {
  data: Character | null;
  isPending: boolean;
};

const initialState: CharacterState = {
  data: initialCharData,
  isPending: false,
};

// fetch character data from DB
export const fetchCharacterData = createAsyncThunk<Character, string>(
  'character/fetchCharacterData',
  async (characterId: string) => {
    try {
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 500);
      // });
      const response = await axios.get<Character>(
        `http://localhost:3000/api/v1/character/${characterId}/all`
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données du personnage :',
        error
      );
      throw error;
    }
  }
);

// update character background in DB
type BackgroundPayload = {
  characterId: string;
  background: string;
};
export const updateCharacterBackground = createAsyncThunk(
  'character/updateCharacterBackground',
  async (payload: BackgroundPayload) => {
    try {
      const { background, characterId } = payload;
      const response = await axios.patch(
        `http://localhost:3000/api/v1/character/${characterId}`,
        {
          background,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des renseignements du personnage :',
        error
      );
      throw error;
    }
  }
);

// update character note in DB
type NotePayload = {
  characterId: string;
  note: string;
};
export const updateCharacterNote = createAsyncThunk(
  'character/updateCharacterNote',
  async (payload: NotePayload) => {
    try {
      const { note, characterId } = payload;
      const response = await axios.patch(
        `http://localhost:3000/api/v1/character/${characterId}`,
        {
          note,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des renseignements du personnage :',
        error
      );
      throw error;
    }
  }
);

// update character info in DB
export type InfoPayload = {
  characterId: string;
  name?: string;
  level?: number;
  experience?: number;
};
export const updateCharacterInfo = createAsyncThunk<Character, InfoPayload>(
  'character/updateCharacterInfo',
  async (payload) => {
    try {
      const { name, level, experience, characterId } = payload;
      const response = await axios.patch(
        `http://localhost:3000/api/v1/character/${characterId}`,
        {
          name,
          level,
          experience,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des renseignements du personnage :',
        error
      );
      throw error;
    }
  }
);

// update character stats in DB
type StatPayload = {
  charId: number;
  statId: number;
  value: number;
};
export const updateCharacterStats = createAsyncThunk(
  'character/updateCharacterStats',
  async (payload: StatPayload) => {
    try {
      const { charId, statId, value } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/stat/associate`,
        {
          char_id: charId,
          stat_id: statId,
          value,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des stats du personnage :',
        error
      );
      throw error;
    }
  }
);

// update character skills in DB
type SkillsPayload = {
  charId: number;
  skillId: number;
};
export const addSkillToCharacter = createAsyncThunk(
  'character/addSkillToCharacter',
  async (payload: SkillsPayload) => {
    try {
      const { charId, skillId } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/skill/associate`,
        {
          char_id: charId,
          skill_id: skillId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des compétences du personnage :',
        error
      );
      throw error;
    }
  }
);
export const removeSkillFromCharacter = createAsyncThunk(
  'character/removeSkillFromCharacter',
  async (payload: SkillsPayload) => {
    try {
      const { charId, skillId } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/skill/dissociate`,
        {
          char_id: charId,
          skill_id: skillId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des compétences du personnage :',
        error
      );
      throw error;
    }
  }
);

// update character items in DB
type ItemsPayload = {
  charId: number;
  itemId: number;
};
export const addItemToCharacter = createAsyncThunk(
  'character/addItemToCharacter',
  async (payload: ItemsPayload) => {
    try {
      const { charId, itemId } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/item/associate`,
        {
          char_id: charId,
          inventory_id: itemId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la modification de l'inventaire du personnage :",
        error
      );
      throw error;
    }
  }
);
export const removeItemFromCharacter = createAsyncThunk(
  'character/removeItemFromCharacter',
  async (payload: ItemsPayload) => {
    try {
      const { charId, itemId } = payload;
      const response = await axios.patch(
        `http://localhost:3000/api/v1/character/item/remove`,
        {
          char_id: charId,
          inventory_id: itemId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la modification de l'inventaire du personnage :",
        error
      );
      throw error;
    }
  }
);
export const toggleEquipItem = createAsyncThunk(
  'character/toggleEquipItem',
  async (payload: ItemsPayload) => {
    try {
      const { charId, itemId } = payload;
      const response = await axios.patch(
        `http://localhost:3000/api/v1/character/item/toggleEquipped`,
        {
          char_id: charId,
          inventory_id: itemId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la modification de l'inventaire du personnage :",
        error
      );
      throw error;
    }
  }
);

// update character spells in DB
type SpellsPayload = {
  charId: number;
  spellId: number;
};
export const addSpellToCharacter = createAsyncThunk(
  'character/addSpellToCharacter',
  async (payload: SpellsPayload) => {
    try {
      const { charId, spellId } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/spell/associate`,
        {
          char_id: charId,
          spell_id: spellId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des compétences du personnage :',
        error
      );
      throw error;
    }
  }
);
export const removeSpellFromCharacter = createAsyncThunk(
  'character/removeSpellFromCharacter',
  async (payload: SpellsPayload) => {
    try {
      const { charId, spellId } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/spell/dissociate`,
        {
          char_id: charId,
          spell_id: spellId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des compétences du personnage :',
        error
      );
      throw error;
    }
  }
);
// update character classes in DB
type ClassesPayload = {
  charId: number;
  classId: number;
};
export const addClassToCharacter = createAsyncThunk(
  'character/addClassToCharacter',
  async (payload: ClassesPayload) => {
    try {
      const { charId, classId } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/class/associate`,
        {
          char_id: charId,
          class_id: classId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des compétences du personnage :',
        error
      );
      throw error;
    }
  }
);
export const removeClassFromCharacter = createAsyncThunk(
  'character/removeSpellFromCharacter',
  async (payload: ClassesPayload) => {
    try {
      const { charId, classId } = payload;
      const response = await axios.post(
        `http://localhost:3000/api/v1/character/class/dissociate`,
        {
          char_id: charId,
          class_id: classId,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        'Erreur lors de la modification des compétences du personnage :',
        error
      );
      throw error;
    }
  }
);
// character slice
const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch character data cases
      .addCase(fetchCharacterData.pending, (state) => {
        state.data = initialCharData;
        state.isPending = true;
      })
      .addCase(fetchCharacterData.fulfilled, (state, action) => {
        state.isPending = false;
        state.data = mapApiDataToCharacter(action.payload);
      })
      .addCase(fetchCharacterData.rejected, (state) => {
        state.isPending = false;
      })

      // update character background cases
      .addCase(updateCharacterBackground.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updateCharacterBackground.fulfilled, (state, action) => {
        state.isPending = false;
        state.data!.background = action.payload.background;
      })
      .addCase(updateCharacterBackground.rejected, (state) => {
        state.isPending = false;
      })

      // update character note cases
      .addCase(updateCharacterNote.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updateCharacterNote.fulfilled, (state, action) => {
        state.isPending = false;
        state.data!.note = action.payload.note;
      })
      .addCase(updateCharacterNote.rejected, (state) => {
        state.isPending = false;
      })

      // update character stats cases
      .addCase(updateCharacterStats.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updateCharacterStats.fulfilled, (state, action) => {
        state.isPending = false;
        state.data = mapApiDataToCharacter(action.payload);
      })
      .addCase(updateCharacterStats.rejected, (state) => {
        state.isPending = false;
      })

      // update character skills cases
      .addCase(addSkillToCharacter.pending, (state) => {
        state.isPending = true;
      })
      .addCase(addSkillToCharacter.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(addSkillToCharacter.rejected, (state) => {
        state.isPending = false;
      })

      .addCase(removeSkillFromCharacter.pending, (state) => {
        state.isPending = true;
      })
      .addCase(removeSkillFromCharacter.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(removeSkillFromCharacter.rejected, (state) => {
        state.isPending = false;
      })

      // update character inventory cases
      .addCase(addItemToCharacter.pending, (state) => {
        state.isPending = true;
      })
      .addCase(addItemToCharacter.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(addItemToCharacter.rejected, (state) => {
        state.isPending = false;
      })

      .addCase(removeItemFromCharacter.pending, (state) => {
        state.isPending = true;
      })
      .addCase(removeItemFromCharacter.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(removeItemFromCharacter.rejected, (state) => {
        state.isPending = false;
      })

      // update character skills cases
      .addCase(addSpellToCharacter.pending, (state) => {
        state.isPending = true;
      })
      .addCase(addSpellToCharacter.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(addSpellToCharacter.rejected, (state) => {
        state.isPending = false;
      })

      .addCase(removeSpellFromCharacter.pending, (state) => {
        state.isPending = true;
      })
      .addCase(removeSpellFromCharacter.fulfilled, (state) => {
        state.isPending = false;
      })
      .addCase(removeSpellFromCharacter.rejected, (state) => {
        state.isPending = false;
      })
      .addCase(updateCharacterInfo.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updateCharacterInfo.fulfilled, (state, action) => {
        state.isPending = false;
        state.data!.name = action.payload.name || state.data!.name;
        state.data!.level = action.payload.level || state.data!.level;
        state.data!.experience =
          action.payload.experience || state.data!.experience;
      })
      .addCase(updateCharacterInfo.rejected, (state) => {
        state.isPending = false;
      });
  },
});

export default characterSlice.reducer;
