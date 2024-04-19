import Game from '../models/Game.js'; 

const StatusVerify = async (req, res, next) => {
    try {
        const gameId = req.params.gameId;

        const game = await Game.findByPk(gameId);

        if (!game) {
            return res.status(404).json({ error: "Jeu non trouvé." });
        }

        if (game.status_id === 3) {
            return res.status(400).json({ error: "Le jeu est déjà archivé." });
        }

        next();
    } catch (error) {
        console.error("Erreur dans le middleware Status:", error);
        return res.status(500).json({ error: "Erreur interne du serveur." });
    }
};

export default StatusVerify;