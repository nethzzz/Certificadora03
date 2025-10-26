const User = require('../models/User');

module.exports = class ParticipantController {

  // Cadastro de participante (apenas admin)
  static async create(req, res) {
    const { name, email, phone, birth, address, sex, type } = req.body;

    if(!name || !email || !phone || !birth || !address || !sex || !type)
      return res.status(422).json({ message: "Todos os campos são obrigatórios!" });

    // Não permitir duplicidade pelo email
    const already = await User.findOne({ email });
    if(already)
      return res.status(422).json({ message: "E-mail já cadastrado!" });

    const user = new User({ name, email, phone, birth, address, sex, type, password: 'senha_trocar' });

    try {
      await user.save();
      res.status(201).json({ message: "Cadastrado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // Listar todos participantes ativos (visualização pública mínima)
  static async getAll(req, res) {
    const projection = (req.type === 'admin')
      ? "-password"
      : "name email type";
    const users = await User.find({ type: { $in: ['voluntario', 'apoiador'] } }).select(projection);
    res.status(200).json(users);
  }

  // Buscar participante por nome ou e-mail
  static async search(req, res) {
    const { q } = req.query;
    if(!q) return res.status(400).json({ message: 'Informe um termo para busca' });

    let query = {
      type: { $in: ['voluntario', 'apoiador'] },
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    };

    const projection = (req.type === 'admin')
      ? "-password"
      : "name email type";
    const users = await User.find(query).select(projection);
    res.status(200).json(users);
  }

  // Atualizar participante (apenas admin)
  static async updateParticipant(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);

    if(!user) return res.status(404).json({ message: "Participante não encontrado." });

    const { name, email, phone, birth, address, sex, type } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.birth = birth || user.birth;
    user.address = address || user.address;
    user.sex = sex || user.sex;
    user.type = type || user.type;

    await user.save();
    res.status(200).json({ message: "Participante atualizado!" });
  }

  // Excluir participante (apenas admin)
  static async removeParticipant(req, res) {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Participante removido com sucesso!" });
  }
};
