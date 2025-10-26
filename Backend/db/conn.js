require('dotenv').config()
const Mongoose = require('mongoose')


async function main() {
  await Mongoose.connect(process.env.MONGODB_URI)
  console.log("Conectamos ao MongoBD!")
}

main().catch((err) => console.log(err))

module.exports = Mongoose