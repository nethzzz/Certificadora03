const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  birth: { type: Date, required: true },
  sex: { type: String, required: true, enum: ['Masculino', 'Feminino', 'Outro'] },
  address: { type: String, required: true },
  type: { type: String, required: true, enum: ['admin', 'voluntario', 'apoiador', 'usuario'] }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
