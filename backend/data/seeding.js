import 'dotenv/config';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import Title from './models/Title.js';
import Spell from './models/Spell.js';
import Skill from './models/Skill.js';
import Stat from './models/Stat.js';
import Class from './models/Class.js';
import Status from './models/Statu.js';
import Inventory from './models/Items.js';
import Note from './models/Note.js';
import User from './models/User.js';
import Game from './models/Game.js';
import Character from './models/Character.js';
import CharPossessesInventory from './models/CharPossessesInventory.js';
import CharKnowsSkill from './models/CharKnowsSkill.js';
import CharIsClass from './models/CharIsClass.js';
import CharHasStat from './models/CharHasStat.js';
import CharMasterSpell from './models/CharMastersSpell.js';

const titles = await Title.bulkCreate([
{ p1: "Bienvenue dans l'antre virtuel où les légendes prennent vie!",
 p2: "Qu'il s'agisse de livrer bataille contre d'impitoyables dragons, de percer les mystères d'anciens artefacts ou de sauver des royaumes entiers des ombres rampantes, chaque quête vous entraînera plus loin dans l'aventure et plus profondément dans l'histoire.",
p3:"Rejoignez nous, braves aventuriers, dans ce monde ou l'imagination n'a pas de limite, laissez vous emporter par les frissons de l'inconu, par le charme de la magie et par la camaraderie forgée au fil des épreuves! Que votre quête commence et que les dés soient à jamais en votre faveur." }
], { returning: true});



const spells = await Spell.bulkCreate([
    { name: "Boule de feu", note: "Inflige des dégâts de feu à la cible." },
    { name: "Javelot de glace", note: "Inflige des dégâts de glace et ralentit la cible." },
    { name: "Éclair foudroyant", note: "Inflige des dégâts électriques à une ligne de cibles." },
    { name: "Vortex du vide", note: "Aspire les ennemis dans un point, infligeant des dégâts du vide." },
    { name: "Tempête de feu", note: "Crée une large zone infligeant des dégâts de feu sur la durée." }
], { returning: true });

  const skills = await Skill.bulkCreate([
    { name: "Précision", note: "Vous avez grandis avec un arc dans les mains ! Ajoutez +1 a votre jets d attaque si vous attaquez à distance", is_active: false,  created_at: new Date(), updated_at: new Date() },
    { name: "Saut de géant", note: "Votre force surhumaine vous permets d'effectuer un saut gigantesque!", is_active: true,  created_at: new Date(), updated_at: new Date()},
    { name: "Bouclier de mana", note: "Convertit un pourcentage de votre mana en un bouclier protecteur qui absorbe les dégâts en fonction du mana dépensé.", is_active: true,  created_at: new Date(), updated_at: new Date() },
    { name: "Soin Naturel", note: "Le joueur récupère lentement de la santé lorsqu il est en contact avec la nature.", is_active: false,  created_at: new Date(), updated_at: new Date() },
    { name: "Maîtrise élémentaire", note: "Permet au joueur de s attacher à un élément pour renforcer ses attaques et débloquer des capacités uniques liées à cet élément.", is_active: false,  created_at: new Date(), updated_at: new Date() },
  ], { returning: true});

  const stats = await Stat.bulkCreate([
    { name : "HP", created_at: new Date(), updated_at: new Date() },
    { name : "CA", created_at: new Date(), updated_at: new Date() },
    { name : "Force", created_at: new Date(), updated_at: new Date()},
    { name : "Dextérité", created_at: new Date(), updated_at: new Date() },
    { name : "Intelligence", created_at: new Date(), updated_at: new Date()},
    { name : "Sagesse", created_at: new Date(), updated_at: new Date() },
    { name : "Charisme", created_at: new Date(), updated_at: new Date() },
    { name : "Constitution", created_at: new Date(), updated_at: new Date() },
  ], { returning:true});

  const status = await Status.bulkCreate([
    { name : "Actif",  created_at: new Date(), updated_at: new Date() },
    { name : "En pause",  created_at: new Date(), updated_at: new Date() },
    { name : "Archivé",  created_at: new Date(), updated_at: new Date() },
  ], { returning: true });

const saltRounds = 10; 

const hashPasswords = async (users) => {
  return await Promise.all(users.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return {
      ...user,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    };
  }));
};

const usersData = [
  { pseudo: "Eric", password: "eric" },
  { pseudo: "Maxime", password: "maxime" },
  { pseudo: "Archibald", password: "archibald" },
  { pseudo: "Thomas", password: "thomas" },
  { pseudo: "Dylan", password: "dylan" },
];

const hashedUsersData = await hashPasswords(usersData);

const users = await User.bulkCreate(hashedUsersData, { returning: true });
  
const notes = await Note.bulkCreate([
    { value: "Note 1", created_at: new Date(), updated_at: new Date() },
    { value: "Note 2", created_at: new Date(), updated_at: new Date() },
    { value: "Note 3", created_at: new Date(), updated_at: new Date() },
    { value: "Note 4", created_at: new Date(), updated_at: new Date() },
    { value: "Note 5", created_at: new Date(), updated_at: new Date() }
], { returning: true});

const classes = await Class.bulkCreate([
    { name: "Guerrier", note:"Maitre du combat au corps à corps", created_at: new Date(), updated_at: new Date() },
    { name: "Mage", note:"Utilise la magie pour lancer des sorts", created_at: new Date(), updated_at: new Date() },
    { name: "Archer", note: "Spécialisé dans l'arc et les attaques à distance", created_at: new Date(), updated_at: new Date() },
    { name: "Voleur", note: "Maître de l'art du vol et de l infiltration", created_at: new Date(), updated_at: new Date() },
    { name: "Prêtre", note: "Dévoué au service des dieux et à la guérison des blessures", created_at: new Date(), updated_at: new Date() }
], { returning: true});

const inventories = await Inventory.bulkCreate([
    { name: "Epée en fer", note:"Arme de base pour les guerriers", created_at: new Date(), updated_at: new Date() },
    { name: "Potion de soin", note: "Restaure des points de vie", created_at: new Date(), updated_at: new Date() },
    { name: "Bouclier en bois", note: "Protège contre les attaques physiques", created_at: new Date(), updated_at: new Date() },
    { name: "Amulette de protection", note: "Augmente la défense contre la magie", created_at: new Date(), updated_at: new Date() },
    { name: "Arc long en chêne", note: "Permet des tirs précis à longue distance", created_at: new Date(), updated_at: new Date() }
], { returning: true});

const games = await Game.bulkCreate([
    { name: "Partie 1", campaign: "Campagne 1", status_id: 1, note_id: 1, user_id: 1, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 2", campaign: "Campagne 2", status_id: 1, note_id: 1, user_id: 1, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 3", campaign: "Campagne 3", status_id: 2, note_id: 2, user_id: 1, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 4", campaign: "Campagne 4", status_id: 2, note_id: 2, user_id: 1, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 5", campaign: "Campagne 5", status_id: 3, note_id: 3, user_id: 1, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 6", campaign: "Campagne 6", status_id: 3, note_id: 3, user_id: 1, created_at: new Date(), updated_at: new Date() },
  //Joueur 2
    { name: "Partie 1", campaign: "Campagne 1", status_id: 1, note_id: 1, user_id: 2, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 2", campaign: "Campagne 2", status_id: 1, note_id: 1, user_id: 2, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 3", campaign: "Campagne 3", status_id: 2, note_id: 2, user_id: 2, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 4", campaign: "Campagne 4", status_id: 2, note_id: 2, user_id: 2, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 5", campaign: "Campagne 5", status_id: 3, note_id: 3, user_id: 2, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 6", campaign: "Campagne 6", status_id: 3, note_id: 3, user_id: 2, created_at: new Date(), updated_at: new Date() },
  //Joueur 3
    { name: "Partie 1", campaign: "Campagne 1", status_id: 1, note_id: 1, user_id: 3, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 2", campaign: "Campagne 2", status_id: 1, note_id: 1, user_id: 3, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 3", campaign: "Campagne 3", status_id: 2, note_id: 2, user_id: 3, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 4", campaign: "Campagne 4", status_id: 2, note_id: 2, user_id: 3, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 5", campaign: "Campagne 5", status_id: 3, note_id: 3, user_id: 3, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 6", campaign: "Campagne 6", status_id: 3, note_id: 3, user_id: 3, created_at: new Date(), updated_at: new Date() },
  //Joueur 4
    { name: "Partie 1", campaign: "Campagne 1", status_id: 1, note_id: 1, user_id: 4, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 2", campaign: "Campagne 2", status_id: 1, note_id: 1, user_id: 4, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 3", campaign: "Campagne 3", status_id: 2, note_id: 2, user_id: 4, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 4", campaign: "Campagne 4", status_id: 2, note_id: 2, user_id: 4, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 5", campaign: "Campagne 5", status_id: 3, note_id: 3, user_id: 4, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 6", campaign: "Campagne 6", status_id: 3, note_id: 3, user_id: 4, created_at: new Date(), updated_at: new Date() },
  //Joueur 5
    { name: "Partie 1", campaign: "Campagne 1", status_id: 1, note_id: 1, user_id: 5, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 2", campaign: "Campagne 2", status_id: 1, note_id: 1, user_id: 5, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 3", campaign: "Campagne 3", status_id: 2, note_id: 2, user_id: 5, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 4", campaign: "Campagne 4", status_id: 2, note_id: 2, user_id: 5, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 5", campaign: "Campagne 5", status_id: 3, note_id: 3, user_id: 5, created_at: new Date(), updated_at: new Date() },
    { name: "Partie 6", campaign: "Campagne 6", status_id: 3, note_id: 3, user_id: 5, created_at: new Date(), updated_at: new Date() },
], { returning: true});

const characters = await Character.bulkCreate([
    { name: "character2", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character3", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character4", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character5", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character6", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character7", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character8", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character9", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character10", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 1 },
    { name: "character11", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character12", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character13", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character14", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character15", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character16", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character17", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character18", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character19", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character20", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 2 },
    { name: "character21", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character22", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character23", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character24", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character25", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character26", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character27", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character28", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character29", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character30", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 3 },
    { name: "character31", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character32", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character33", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character34", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character35", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character36", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character37", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character38", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character39", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character40", experience: 100, level: 1, health: 100, user_id: 1, created_at: new Date(), updated_at: new Date(), game_id: 4 },
    { name: "character41", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character42", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character43", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character44", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character45", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character46", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character47", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character48", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character49", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character50", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 5 },
    { name: "character51", experience: 100, level: 1, health: 100, user_id: 5, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character52", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character53", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character54", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character55", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character56", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character57", experience: 100, level: 1, health: 100, user_id: 2, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character58", experience: 100, level: 1, health: 100, user_id: 3, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character59", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 6 },
    { name: "character60", experience: 100, level: 1, health: 100, user_id: 4, created_at: new Date(), updated_at: new Date(), game_id: 6 },
], { returning: true});


  await CharKnowsSkill.bulkCreate(characters.flatMap(char =>
    skills.map(skill => ({
      char_id: char.id,
      skill_id: skill.id,
      created_at: new Date(),
      updated_at: new Date()
    }))
  ));
  
  await CharIsClass.bulkCreate(characters.map((char, index) => ({
    char_id: char.id,
    class_id: classes[0].id,
    created_at: new Date(),
    updated_at: new Date()
  })));

  await CharHasStat.bulkCreate(characters.flatMap(char =>
    stats.map(stat => ({
      char_id: char.id,
      stat_id: stat.id,
      value: faker.number.int({ min: 1, max: 100 }),
      created_at: new Date(),
      updated_at: new Date()
    }))
  ));

  await CharPossessesInventory.bulkCreate( characters.map((char, index) => ({
    char_id: char.id,
    inventory_id: inventories[0].id,
    is_equipped: faker.datatype.boolean(),
    created_at: new Date(),
    updated_at: new Date()
  })));

  await CharMasterSpell.bulkCreate(characters.flatMap(char =>
    spells.map(spell => ({
      char_id: char.id,
      spell_id: spell.id,
      created_at: new Date(),
      updated_at: new Date()
    }))
  ));