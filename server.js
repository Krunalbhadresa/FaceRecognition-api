const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '1',
      name: 'krunal',
      email:'krunal@gmail.com',
      password: 'krunal',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'ezio',
      email:'ezio@gmail.com',
      password: 'ezio',
      entries: 0,
      joined: new Date()
    }
  ]
}

//------------------------------
// ROOT ROUTE
//------------------------------
app.get('/', (req, res) => {
  res.send(database.users);
})

//------------------------------
// SIGNIN ROUTE
//------------------------------
app.post('/signin', (req,res) => {
  if(req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password) {
      res.json('success');
  } else {
    res.status(400).json('error logging in');
  }
})

//------------------------------
// REGISTER ROUTE
//------------------------------
app.post('/register', (req,res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '3',
    name: name,
    email:email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

//------------------------------
// PROFILE ROUTE
//------------------------------
app.get('/profile/:id', (req,res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    } 
  })
  if(!found) {
    res.status(404).json('not found')
  }
})

//------------------------------
// IMAGE ROUTE
//------------------------------
app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    } 
  })
  if(!found) {
    res.status(404).json('not found')
  }
})





app.listen(3000, () => {
  console.log('App is running');
})

























