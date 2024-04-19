import jwt from 'jsonwebtoken';

/* Pour un MVP cette requête est simple ca marche mais peu sécurisé , 
Si on voulait plus sécurisé notre token , on l'aurait mis dans un cookie_secret afin de renforcer sa sécurité */

const AuthJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token JWT invalide' });
        }
    } else {
        return res.status(401).json({ message: 'Token JWT manquant' });
    }
};

export default AuthJwt;