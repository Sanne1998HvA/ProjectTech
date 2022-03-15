const express = require('express')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
// voor de form
const User = require('./models/User')
//const port = 1337
const port = process.env.port || 1337

require('dotenv').config()

const connectDB = require('./config/db')
const res = require('express/lib/response')
connectDB();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true   }));

app.use(express.static(__dirname + '/static'));

app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
   res.render('home')
  })

app.get('/about', (req, res) => {
  res.render('about', {
    person: {
      firstname: "Sanne",
      lastname: "Kes",
    }
    });
  })

app.get('/inloggen', (req, res) => {
  res.render('inloggen')
      })

app.get('/signup', (req, res) => {
  res.render('signup')
      })


app.post ("/inloggen", (req, res) => {
  console.log (req.body)
})

// app.post ("/signup", (req, res) => {

// })



// FOUT FOUT FOUT 
// app.post('/home', async ( req, res) => {
//   const gebruikersnaam = req.body.gebruikersnaaam
//   const wachtwoord = req.body.wachtwoord
//   try {
//     const verborgenWachtwoord = await bcrypt.hash(password, 10)
  
//   const result = await User.create({
//     gebruikersnaaam: userName,
//     email: email,
//     wachtwwoord: verborgenWachtwoord 
//   })
//     res.redirect('/about')
//   } catch {
//     console.log('Niet gelukt om in te loggen, probeer het nog eens.')
//     res.redirect('home')
//   }
// })

// app.get('/about', (req, res) => {
//   res.render('about', {
//       person: {
//       gebruikersnaam: user,
//     }
//     })
//   })
// FOUT FOUT FOUT 





// Alles hieronder zorgt voor de validatie van de form
  
//checkt of het ingevoerde email adres niet eerder is gebruikt voor het aanmaken van een account
app.post("/signup", (req, res) => {

  console.log(req.body);

    User.findOne({ email: req.body.emailAdres }).then((user) => {
        if  (user){
          // Geef een 400 error als de ingevulde email al bestaat
          return res.status(400).json({ emailAdres: "Een gebruiker heeft deze email al geregistreerd"})
        } else {
          // Als deze niet bestaat, maak nieuwe gebruiker aan
          const newUser = new User({
            userName: req.body.userName,
            email: req.body.emailAdres,
            password: req.body.passWord,
          });
            newUser.save()
          return res.status(200).json({msg: newUser})
        }
      });
    });

    router.post ('/registreren', async (req, res) => { 
      console.log('De gegevens zijn succesvol opgehaald') 
      const newUser = new User ({ 
      userName: req.body.userName, 
      emailAdres: req.body.emailAdres, 
      password: wachtwoord 
    }); 
 
          newUser.save((error) => { 
        if (error) { 
          console.log(error); 
          return res.status(500).redirect('/registreren'); 
        } 
      return res.status(200).redirect('/');
     });
     });



    
// app.post('/post-feedback', function (req, res) {
//     dbConn.then(function(db) {
//         delete req.body._id; // for safety reasons
//         db.collection('feedbacks').insertOne(req.body);
//       });

//       res.send('Data received:\n' + JSON.stringify(req.body));
//   });
      

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})










// Alles hieronder zorgt ervoor dat de tekst tussen de haakjes naar de pagina worden gestuurd. Week 2 
  
/* const port = process.env.port || 1337 */

// app.get('/', (req, res) => {
//  res.send('Hallo Sanne!')
// })

// app.get('/about', (req, res) => {
//   res.send('Ik ben Sanne en ik ben 23 jaar oud')
// })

// app.get('/contact', (req, res) => {
//   res.send('Je kan mij bereiken op... SIKE ga mijn telefoonnummer niet geven.')
// })

// app.get('*', (req, res) => {
//   res.send('404 Page not found')
// })