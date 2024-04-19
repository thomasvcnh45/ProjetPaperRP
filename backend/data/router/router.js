import express from 'express';

import userController from '../controller/userController.js';
import gameController from '../controller/gameController.js';
import statusController from '../controller/statuController.js';
import noteController from '../controller/noteController.js';
import classController from '../controller/classController.js';
import skillController from '../controller/skillControler.js';
import spellController from '../controller/spellControler.js';
import statController from '../controller/statController.js';
import invotoryController from '../controller/itemController.js'
import characterController from '../controller/characterController.js';
import AuthJwt from '../middleware/AuthJwt.js';
import StatusVerify from '../middleware/statusVerify.js';
import Stat from '../models/Stat.js';

const router = express.Router();

// Route Inscription / Connection
router.post('/api/v1/register', userController.register);
router.post('/api/v1/login', userController.login);

// vérification du token pour raffraichir automatiquement
router.post('/api/v1/verify-token', AuthJwt, (req, res) => {
    res.json({ isValid: true, user: req.user });
  });


// Récuperer les personnages d'un utilisateur
router.get('/api/v1/users/:userId/characters', characterController.getCharactersByUserId);

// Récupérer les parties d'un utilisateur
router.get('/api/v1/users/:userId/games', userController.getUserGames);


// Récuperer les notes / status / characters / user d'une partie
router.get('/api/v1/games/:gameId/notes', StatusVerify, gameController.getGameNotes);
router.get('/api/v1/games/:gameId/status', StatusVerify, gameController.getGameStatus);
router.get('/api/v1/games/:gameId/characters',gameController.getGameCharacters);
router.get('/api/v1/games/:gameId/user', gameController.getGameUser);


// Récupérer toutes les informations de TOUS les personnages
router.get('/api/v1/characters/all', characterController.getCharactersWithAll);


// Récupérer toutes les informations D'UN personnage
router.get('/api/v1/character/:characterId/all', characterController.getCharacterWithAllById);
// Récupérer toutes les informatiosn d'un personnage avec ses parties et son user
router.get('/api/v1/characters/:characterId/allInclude', characterController.getCharacterWithGameAndUserById);


// Associé un personnage a une partie / modifier un personnage / supprimer un personnage
router.post('/api/v1/game/character/associate/game/user', gameController.addCharacterToGame);
router.patch('/api/v1/character/:id',characterController.update);
router.delete('/api/v1/character/:id',characterController.delete);


// Associé une note / statu a une partie
router.post('/api/v1/game/note/associate', gameController.addNoteToGame);
router.post('/api/v1/game/statu/associate', StatusVerify, gameController.addStatusToGame);


// Associé un utilisateur a une partie
router.post('/api/v1/user/game/associate', userController.associateUserToGame);


// Associé / Dissocié un skill a un personnage
router.post('/api/v1/character/skill/associate',characterController.addSkillToCharacter)
router.post('/api/v1/character/skill/dissociate', characterController.removeSkillFromCharacter)


// ASsigné un personnage a un user
router.post('/api/v1/character/user/associate',characterController.assignCharacterToUser)

// Associé / Dissocié une class a un personnage
router.post('/api/v1/character/class/associate', characterController.assignClassToCharacter)
router.post('/api/v1/character/class/dissociate', characterController.removeClassFromCharacter)

// Associé / Dissocié une sort a un personnage
router.post('/api/v1/character/spell/associate', characterController.assignSpellToCharacter)
router.post('/api/v1/character/spell/dissociate', characterController.removeSpellFromCharacter)

// Associé / Dissocié une stat a un personnage
router.post('/api/v1/character/stat/associate', characterController.assignStatToCharacter)
router.post('/api/v1/character/stat/dissociate', characterController.removeStatFromCharacter)

// Associé / Dissocié un inventory a un personnage
router.post('/api/v1/character/item/associate', characterController.assignItemToCharacter)
router.post('/api/v1/character/item/dissociate',characterController.removeItemFromCharacter)
router.patch('/api/v1/character/item/remove', characterController.deleteInventoryFromCharacter)
router.patch('/api/v1/character/item/toggleEquipped', characterController.toggleItemEquippedStatus)

// Toutes les méthodes pour prendre un user / tous les users / update / delete
router.get('/api/v1/user/:id', userController.getOne);
router.get('/api/v1/users', userController.getAll);
router.patch('/api/v1/user/:id', userController.update);
router.delete('/api/v1/user/:id', userController.delete);

// Toutes les méthodes pour prendre un statu / tous les status / update / delete
router.get('/api/v1/statu/:id', statusController.getOne);
router.get('/api/v1/status', statusController.getAll);
router.post('/api/v1/statu', statusController.create);
router.patch('/api/v1/statu/:id', statusController.update);
router.delete('/api/v1/statu/:id', statusController.delete);

// Toutes les méthodes pour prendre un note / tous les notes / update / delete
router.get('/api/v1/note/:id', noteController.getOne);
router.get('/api/v1/notes', noteController.getAll);
router.post('/api/v1/note', noteController.create);
router.patch('/api/v1/note/:id',noteController.update);
router.delete('/api/v1/note/:id', noteController.delete);

// Toutes les méthodes pour prendre une game / tous les games / update / delete
router.get('/api/v1/game/:id', gameController.getOne);
router.get('/api/v1/games', gameController.getAll);
router.post('/api/v1/game', gameController.create);
router.patch('/api/v1/game/:id',gameController.update);
router.delete('/api/v1/game/:id', gameController.delete);

// Toutes les méthodes pour prendre une class / tous les classes / update / delete
router.get('/api/v1/class/:id',classController.getOne);
router.get('/api/v1/classes',classController.getAll);
router.post('/api/v1/class', classController.create);
router.patch('/api/v1/class/:id', classController.update);
router.delete('/api/v1/class/:id', classController.delete);


// Toutes les méthodes pour prendre un skill / tous les skills / update / delete
router.get('/api/v1/skill/:id',skillController.getOne);
router.get('/api/v1/skills',skillController.getAll);
router.post('/api/v1/skill', skillController.create);
router.patch('/api/v1/skill/:id',skillController.update);
router.delete('/api/v1/skill/:id', skillController.delete);

// Toutes les méthodes pour prendre un spell / tous les spells / update / delete
router.get('/api/v1/spell/:id', spellController.getOne);
router.get('/api/v1/spells', spellController.getAll);
router.post('/api/v1/spell', spellController.create);
router.patch('/api/v1/spell/:id', spellController.update);
router.delete('/api/v1/spell/:id',spellController.delete);


// Toutes les méthodes pour prendre une stat / tous les stats / update / delete
router.get('/api/v1/stat/:id', statController.getOne);
router.get('/api/v1/stats', statController.getAll);
router.post('/api/v1/stat', statController.create);
router.patch('/api/v1/stat/:id', statController.update);
router.delete('/api/v1/stat/:id', statController.delete);

// Toutes les méthodes pour prendre un inventaire / tous les inventaires / update / delete
router.get('/api/v1/item/:id', invotoryController.getOne);
router.get('/api/v1/items', invotoryController.getAll);
router.post('/api/v1/item', invotoryController.create);
router.patch('/api/v1/item/:id', invotoryController.update);
router.delete('/api/v1/item/:id', invotoryController.delete);

// Toutes les méthodes pour prendre un character / tous les characters / update / delete
router.get('/api/v1/character/:id',characterController.getOne);
router.get('/api/v1/characters', characterController.getAll);
router.post('/api/v1/character', characterController.create);
router.patch('/api/v1/character/:id', characterController.update);
router.delete('/api/v1/character/:id', characterController.delete);


export default router;
