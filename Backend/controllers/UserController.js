const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/createUserToken');

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, birth, sex, type, address, password, confirmpassword } = req.body;

    if (!name || !email || !phone || !birth || !sex || !type || !address || !password || !confirmpassword)
      return res.status(422).json({ message: 'Todos os campos são obrigatórios!' });
    if(password !== confirmpassword)
      return res.status(422).json({ message: 'Senhas não conferem!' });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name, email, phone, birth, sex, type, address,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(422).json({ message: "E-mail e senha são obrigatórios!" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(422).json({ message: "Credenciais incorretas!" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(422).json({ message: "Credenciais incorretas!" });

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;
    if (req.id) {
      currentUser = await User.findById(req.id).select("-password");
    } else {
      currentUser = null;
    }
    res.status(200).json(currentUser);
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if(!user) return res.status(422).json({ message: 'Usuário não encontrado!'});
    res.status(200).json(user);
  }

  static async editUser(req, res) {
    const { id } = req.params;
    if(id !== req.id)
      return res.status(422).json({ message: 'Permissão negada.' });

    const user = await User.findOne({ _id: id });
    const { name, email, phone, birth, sex, type, password, confirmpassword, address } = req.body;

    if (!name || !email || !phone || !birth || !sex || !type || !address)
      return res.status(422).json({ message: 'Todos os campos são obrigatórios!' });

    if(email !== user.email && await User.findOne({ email }))
      return res.status(422).json({ message: 'E-mail já existe!' });

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.birth = birth;
    user.sex = sex;
    user.type = type;
    user.address = address;

    if(password && confirmpassword) {
      if(password !== confirmpassword)
        return res.status(422).json({ message: 'As senhas não conferem!' });

      const salt = await bcrypt.genSalt(12);
      user.password = await bcrypt.hash(password, salt);
    }

    try {
      await user.save();
      res.status(200).json({ message: "Usuário atualizado!" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    if(id !== req.id)
      return res.status(422).json({ message: 'Permissão negada.' });

    try {
      await User.deleteOne({ _id: id });
      res.status(200).json({ message: "Usuário removido!" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
