const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
// inserting data needs to have the correct structure
// for this reason the events have independent
// structures and therefore we are destruturing out
// the values which exist on the request body,
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
  // that is, {id, content and postId}
  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    // and we will push in our comment with id and content
    // id is being used to route to the appropriate post
    post.comments.push({ id, content });
  }

  console.log(posts);
  
  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
