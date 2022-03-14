// require MongoDB
const mongoose = require('mongoose')

// connect to MongoDB
const connectDB = () => {
  try {
    mongoose.connect (process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB - connected')
  } catch (err) {
    console.log ('error occured while trying to connect to db',)
  }
 }
 module.exports = connectDB

// // Alles hieronder zorgt voor de validatie van de form
// app.post("/register", (req, res) =>{

//   //checkt of het ingevoerde email adres niet eerder is gebruikt voor het aanmaken van een account

// User.findOne({ email: req.body.email }).then((user) => {
//     if  (user) {
//       // Geef een 400 error als de ingevulde email al bestaat
//       return res.status(400).json({ email: "Een gebruiker heeft deze email al geregistreerd"})
//     } else {
//       // Als deze niet bestaat, maak nieuwe gebruiker aan
//       const newUser = new User({
//         userName: req.body.userName,
//         email: req.body.email,
//         password: req.body.password,
//       });
//         newUser.save()
//       return res.status(200).json ({msg: newUser})
//     }
//   });
// });