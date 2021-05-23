const express = require('express');


const app = express();

app.get('/posts', (req, res) => {
    
});

app.post('/posts', (req, res) => { });


app.listen(4000, () => {
    console.log('Listening on Port 4000');
});



