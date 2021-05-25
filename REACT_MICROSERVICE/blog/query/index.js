const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// lists all posts
app.get('/posts', (req, res) => {
  res.send(posts);
});
//recieving events from event bus
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  //PostCreated event has an id and title
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  // CommentCreated event has a different structure
  // (4) pull of the status, and add to the push
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
   
    post.comments.push({ id, content, status });
  }

  console.log(posts);
  
  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
