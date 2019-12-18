const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const app = express();
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

let nextId = 7;

let friends = [
  {
    id: 1,
    name: 'Michael Scott',
    age: 45,
    email: 'BestBossEver@DunderMifflin.com',
    image: "https://vignette.wikia.nocookie.net/theoffice/images/0/02/Michael_Scott.jpg/revision/latest/scale-to-width-down/350?cb=20170701090332"
  },
  {
    id: 2,
    name: 'Dwight Schrute',
    age: 34,
    email: 'AssistantToThe@DunderMifflin.com',
    image: "https://vignette.wikia.nocookie.net/theoffice/images/c/c5/Dwight_.jpg/revision/latest/scale-to-width-down/350?cb=20170701082424"
  },
  {
    id: 3,
    name: 'Jim Halpert',
    age: 32,
    email: 'BigTuna@DunderMifflin.com',
    image: "https://vignette.wikia.nocookie.net/theoffice/images/9/9a/Jim.jpg/revision/latest/scale-to-width-down/350?cb=20170701084550"
  },
  {
    id: 4,
    name: 'Creed Bratton',
    age: 30,
    email: 'bobody@DunderMifflin.com',
    image: "https://vignette.wikia.nocookie.net/theoffice/images/2/20/2009Creed.jpg/revision/latest/scale-to-width-down/350?cb=20170701085348"
  },
  {
    id: 5,
    name: 'Oscar Martinez',
    age: 31,
    email: 'TheCount@DunderMifflin.com',
    image: "https://vignette.wikia.nocookie.net/theoffice/images/2/25/Oscar_Martinez.jpg/revision/latest/scale-to-width-down/350?cb=20170701085818"
  },
  {
    id: 6,
    name: 'Andy Bernard',
    age: 30,
    email: 'NardDog@DunderMifflin.com',
    image: "https://vignette.wikia.nocookie.net/theoffice/images/b/b5/Andy_Bernard.jpg/revision/latest/scale-to-width-down/350?cb=20170701084205"
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: 'User must be logged in to do that.' });
  }
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Michael Scott' && password === 'password') {
    req.loggedIn = true;
    res.status(200).json({
      payload: token
    });
  } else {
    res
      .status(403)
      .json({ error: 'Username or Password incorrect. Please see Readme' });
  }
});

app.get('/api/friends', authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends);
  }, 1000);
});

app.get('/api/friends/:id', authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.post('/api/friends', authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.put('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  const friendIndex = friends.findIndex(f => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1)
    ];
    res.send(friends);
  } else {
    res.status(404).send({ msg: 'Friend not found' });
  }
});

app.delete('/api/friends/:id', authenticator, (req, res) => {
  const { id } = req.params;

  friends = friends.filter(f => f.id !== Number(id));

  res.send(friends);
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
