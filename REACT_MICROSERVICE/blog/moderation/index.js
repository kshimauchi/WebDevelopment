const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// We need to emit the comment moderated
const app = express();
app.use(bodyParser.json());

// events will be on the req.body
app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        //we want to go through moderation simple example
        const status = data.content.includes('blue') ? 'rejected' : 'approved';

        //we want to emit the commentModerated event to the event bus
        await axios.post('http://localhost:4005/events', {
            // the properties will be updated with status
            // for CommentModerated
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            } 
        });
    }
    res.send({});
});

app.listen(4003, () => {
    console.log('Listening on port 4003');
});