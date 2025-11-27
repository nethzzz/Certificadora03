const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = (req, res, next) => {
  let token;
  if (!req.headers['authorization'])
    return res.status(401).json({ message: "Acesso negado!" });

  const authHeader = req.headers['authorization'];
  token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (!token)
    return res.status(401).json({ message: "Acesso negado!" });

  const secret = process.env.SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    req.id = decoded.id;
    req.type = decoded.type;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido!" });
  }
};

module.exports = checkToken;
