const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

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

  handleEvent(type, data);
  
  res.send({});
});
const handleEvent = (type, data) => {
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
  if (type === 'CommentUpdated') {
    
    const { id, content, postId, status } = data;
    
    const post = posts[postId];

    const comment = post.comments.find(comment => {
      
      return comment.id === id;
     
    });
    //Since we don't know what property was changed
    //We directly change both
    comment.status = status;
    comment.content = content;
  }
}
app.listen(4002, async () => {
  console.log("Listening on 4002");
  try {
    // grab all the events from the event bus
    const res = await axios.get("http://localhost:4005/events");
 
    for (let event of res.data) {
      console.log("Processing event:", event.type);
 
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
