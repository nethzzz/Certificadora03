const isAdmin = (req, res, next) => {
  if (req.type !== 'admin') {
    return res.status(403).json({ message: "Acesso restrito para administradores." });
  }
  next();
};

module.exports = isAdmin;
