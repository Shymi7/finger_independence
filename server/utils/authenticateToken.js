const jwt = require("jsonwebtoken");
const config = require("../config");
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token.replace('Bearer ', ''), config.secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;