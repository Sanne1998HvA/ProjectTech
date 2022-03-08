const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
//const port = 1337
const port = process.env.port || 1337

require('dotenv').config()

const connectDB = require('./config/db')
connectDB();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(__dirname + '/static'));

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