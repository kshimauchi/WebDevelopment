const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

// app.use(bodyParser.json()); as of express 4.16+ we can replace this line
app.use(express.json());
// use for network request from 3000-> 4000
app.use(cors());
//object storage for the time being
const posts = {};

// Route Handlers, just in memory just an example
// Get all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

//Create a resource 
app.post('/posts', (req, res) => {
    
    const id = randomBytes(4).toString('hex');
    
    const { title } = req.body;
    
    posts[id] = {
        id, title
    };
    //sends a response for a new posts
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Listening on Port 4000');
});

/*
send post request, to localhost:4000/posts with body below 
should get a response manual

POST
201 status with create
    {
        "title" : "first post"
    }
201 status but, notice the response only has id
    {
        "wrong" : "second post"
    }
GET    
localhost:4000/posts
we recieve the entire object, blob

{
    "66b45810": {
        "id": "66b45810",
        "title": "second post"
    },
    "7bb6b061": {
        "id": "7bb6b061"
    },
    "86c0dd5e": {
        "id": "86c0dd5e",
        "title": "second post"
    },
    "bd8ad1ae": {
        "id": "bd8ad1ae"
    }
}

*/

