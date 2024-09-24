// src/middleware/authMiddleware.js

// const authMiddleware = (req, res, next) => {
//     console.log('Session:', req.session);
//     if (!req.session.userId) {
//         console.log('Unauthorized access! No userId in session');
//         return res.status(401).json({ error: 'Unauthorized access' });
//     }
//     next();
// };

const authMiddleware = (req, res, next) => {
    // If you're using sessions
    if (req.session && req.session.userId) {
        req.userId = req.session.userId;
        return next();
    }

    // If using a token (JWT)
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret
            req.userId = decoded.id;
            return next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }

    return res.status(401).redirect('/login');
};




module.exports = { authMiddleware };