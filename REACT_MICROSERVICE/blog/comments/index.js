const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
//added cors()
app.use(cors());
// we are looking for all posts by user
// 'a3342fdsa' 
// {id: 'kfjldajkjfd12', content:'infomative'}
// in memory storage only there until server reboots
const commentsByPostId = {};


app.get('/posts/:id/comments', (req, res) =>  {
    res.send(commentsByPostId[req.params.id] || [])
});

app.post('/posts/:id/comments', (req, res) => {
    
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });
    
    commentsByPostId[req.params.id] = comments;
    
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});
/*
GET all posts by user, status 200
localhost:4001/posts/123/comments
[
    {
        "id": "409e8dfe",
        "content": "this is a comment"
    },
    {
        "id": "9d33756f",
        "content": "this a second comment"
    }
]
POST userId could be anything just an example
localhost:4001/posts/123/comments
{
    "content": "this a second comment"
}
*/