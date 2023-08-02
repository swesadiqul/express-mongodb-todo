const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000


const app = express()


app.get('/api/todos', (req, res) => {
  res.send('Get Todos.')
});

app.post('/api/todos', (req, res) => {
  res.send('Set Todo.')
});

app.get('/api/todos/:id', (req, res) => {
  res.send('Get Todo.')
});

app.put('/api/todos/:id', (req, res) => {
  res.send('Update Todo.')
});

app.delete('/api/todos/:id', (req, res) => {
  res.send('Delete Todo.')
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});