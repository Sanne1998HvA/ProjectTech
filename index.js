const express = require('express')
const app = express()
const port = 1337
/* const port = process.env.port || 1337 */

app.get('/', (req, res) => {
  res.send('Hallo Sanne!')
})

app.get('/about', (req, res) => {
  res.send('Ik ben Sanne en ik ben 23 jaar oud')
})

app.get('/contact', (req, res) => {
  res.send('Je kan mij bereiken op... SIKE ga mijn telefoonnummer niet geven.')
})

app.get('*', (req, res) => {
  res.send('404 Page not found')
})



app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})
