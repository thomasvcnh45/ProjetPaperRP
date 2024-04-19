import express from 'express';

import userController from '../controller/userController.js';
import gameController from '../controller/gameController.js';
import statusController from '../controller/statuController.js';
import noteController from '../controller/noteController.js';
import classController from '../controller/classController.js';
import skillController from '../controller/skillControler.js';
import spellController from '../controller/spellControler.js';
import statController from '../controller/statController.js';
import invotoryController from '../controller/inventoryController.js'
import characterController from '../controller/characterController.js';
import AuthJwt from '../middleware/AuthJwt.js';

const router = express.Router();


router.post('/api/v1/register', userController.register);
router.post('/api/v1/login', userController.login);

router.get('/api/v1/users/:userId/games', AuthJwt, userController.getUserGames);

router.get('/api/v1/games/:gameId/notes', AuthJwt, gameController.getGameNotes);
router.get('/api/v1/games/:gameId/status', AuthJwt, gameController.getGameStatus);
router.get('/api/v1/games/:gameId/characters', gameController.getGameCharacters);
router.get('/api/v1/games/:gameId/user', AuthJwt, gameController.getGameUser);

router.get('/api/v1/characters/stats', AuthJwt, characterController.getCharactersWithStats);
router.get('/api/v1/characters/classes', AuthJwt, characterController.getCharactersWithClasses);
router.get('/api/v1/characters/skills', AuthJwt, characterController.getCharactersWithSkills);
router.get('/api/v1/characters/spells', AuthJwt, characterController.getCharactersWithSpells);
router.get('/api/v1/characters/inventories', AuthJwt, characterController.getCharactersWithInventories); 
router.get('/api/v1/characters/all', AuthJwt, characterController.getCharactersWithAll);

router.get('/api/v1/character/:characterId/stats', AuthJwt, characterController.getCharacterStats);
router.get('/api/v1/character/:characterId/classes', AuthJwt, characterController.getCharacterClasses);
router.get('/api/v1/character/:characterId/skills', AuthJwt, characterController.getCharacterSkills);
router.get('/api/v1/character/:characterId/spells', AuthJwt, characterController.getCharacterSpells);
router.get('/api/v1/character/:characterId/inventories', AuthJwt, characterController.getCharacterInventories);

router.post('/api/v1/game/character/associate',AuthJwt, gameController.addCharacterToGame);
router.patch('/api/v1/character/:id', AuthJwt,characterController.update);
router.delete('/api/v1/character/:id', AuthJwt,characterController.delete);

router.post('/api/v1/game/note/associate',AuthJwt, gameController.addNoteToGame);
router.post('/api/v1/game/statu/associate',AuthJwt, gameController.addStatusToGame);

router.post('/api/v1/character/skill/associate',AuthJwt,characterController.addSkillToCharacter)
router.post('/api/v1/character/skill/dissociate',AuthJwt, characterController.removeSkillFromCharacter)

router.post('/api/v1/character/user/associate',AuthJwt,characterController.assignCharacterToUser)

router.post('/api/v1/character/class/associate',AuthJwt, characterController.assignClassToCharacter)
router.post('/api/v1/character/class/dissociate',AuthJwt, characterController.removeClassFromCharacter)

router.post('/api/v1/character/spell/associate', AuthJwt,characterController.assignSpellToCharacter)
router.post('/api/v1/character/spell/dissociate',AuthJwt, characterController.removeSpellFromCharacter)

router.post('/api/v1/character/stat/associate',AuthJwt, characterController.assignStatToCharacter)
router.post('/api/v1/character/stat/dissociate', AuthJwt,characterController.removeStatFromCharacter)

router.post('/api/v1/character/inventory/associate',AuthJwt, characterController.assignInventoryToCharacter)
router.post('/api/v1/character/inventory/dissociate',AuthJwt,characterController.removeInventoryFromCharacter)

router.get('/api/v1/user/:id', AuthJwt, userController.getOne);
router.get('/api/v1/users', AuthJwt, userController.getAll);
router.patch('/api/v1/user/:id', AuthJwt, userController.update);
router.delete('/api/v1/user/:id', AuthJwt, userController.delete);

router.get('/api/v1/statu/:id', AuthJwt, statusController.getOne);
router.get('/api/v1/status', AuthJwt, statusController.getAll);
router.post('/api/v1/statu', AuthJwt, statusController.create);
router.patch('/api/v1/statu/:id', AuthJwt, statusController.update);
router.delete('/api/v1/statu/:id', AuthJwt, statusController.delete);

router.get('/api/v1/note/:id', AuthJwt, noteController.getOne);
router.get('/api/v1/notes', AuthJwt, noteController.getAll);
router.post('/api/v1/note', AuthJwt, noteController.create);
router.patch('/api/v1/note/:id', AuthJwt, noteController.update);
router.delete('/api/v1/note/:id', AuthJwt, noteController.delete);

router.get('/api/v1/game/:id', AuthJwt, gameController.getOne);
router.get('/api/v1/games', AuthJwt, gameController.getAll);
router.post('/api/v1/game', AuthJwt, gameController.create);
router.patch('/api/v1/game/:id', AuthJwt, gameController.update);
router.delete('/api/v1/game/:id', AuthJwt, gameController.delete);

router.get('/api/v1/class/:id', AuthJwt, classController.getOne);
router.get('/api/v1/classes', AuthJwt, classController.getAll);
router.post('/api/v1/class', AuthJwt, classController.create);
router.patch('/api/v1/class/:id', AuthJwt, classController.update);
router.delete('/api/v1/class/:id', AuthJwt, classController.delete);

router.get('/api/v1/skill/:id', AuthJwt, skillController.getOne);
router.get('/api/v1/skills', AuthJwt, skillController.getAll);
router.post('/api/v1/skill', AuthJwt, skillController.create);
router.patch('/api/v1/skill/:id', AuthJwt, skillController.update);
router.delete('/api/v1/skill/:id', AuthJwt, skillController.delete);

router.get('/api/v1/spell/:id', AuthJwt, spellController.getOne);
router.get('/api/v1/spells', AuthJwt, spellController.getAll);
router.post('/api/v1/spell', AuthJwt, spellController.create);
router.patch('/api/v1/spell/:id', AuthJwt, spellController.update);
router.delete('/api/v1/spell/:id', AuthJwt, spellController.delete);

router.get('/api/v1/stat/:id', AuthJwt, statController.getOne);
router.get('/api/v1/stats', AuthJwt, statController.getAll);
router.post('/api/v1/stat', AuthJwt, statController.create);
router.patch('/api/v1/stat/:id', AuthJwt, statController.update);
router.delete('/api/v1/stat/:id', AuthJwt, statController.delete);

router.get('/api/v1/inventory/:id', AuthJwt, invotoryController.getOne);
router.get('/api/v1/inventorys', AuthJwt, invotoryController.getAll);
router.post('/api/v1/inventory', AuthJwt, invotoryController.create);
router.patch('/api/v1/inventory/:id', AuthJwt, invotoryController.update);
router.delete('/api/v1/inventory/:id', AuthJwt, invotoryController.delete);

router.get('/api/v1/character/:id', AuthJwt, characterController.getOne);
router.get('/api/v1/characters', AuthJwt, characterController.getAll);
router.post('/api/v1/character', AuthJwt, characterController.create);
router.patch('/api/v1/character/:id', AuthJwt, characterController.update);
router.delete('/api/v1/character/:id', AuthJwt, characterController.delete);


export default router;
