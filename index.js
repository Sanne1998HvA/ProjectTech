const express = require('express')
const {engine} = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
// voor de form
const User = require('./models/User')
//const port = 1337
const port = process.env.PORT || 3000


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

app.post('/inloggen', async (req, res) => {
  try {
    const deGebruiker = await User.findOne({'email': req.body.email}).lean()
    const wachtwoord = req.body.wachtwoord

    if(deGebruiker){
      console.log(deGebruiker.password, wachtwoord)
      if (deGebruiker.password === wachtwoord) {
        // return deGebruiker
        res.redirect('/about')
        console.log('succesvol ingelogd')
      } else {
        //return 'invalid password'
        console.log('fout')
      }
    } else {
      // return 'user was not found'
      console.log('gebruiker niet gevonden')
    }

  } catch (error) {
    throw new Error(error)
  }
})

// Alles hieronder zorgt voor de sign up form en de validatie
  
//laat sign up pagina zien
app.post("/signup", (req, res) => {
  console.log(req.body);

//checkt of het ingevoerde email adres niet eerder is gebruikt voor het aanmaken van een account
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


     app.listen(port, () => {
      console.log(`Example app listening on localhost:${port}`)
    })
    