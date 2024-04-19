import express from 'express';
import dotenv from 'dotenv';
import sequelize from './data/models/client.js';

import router from './data/router/router.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(router);



sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });