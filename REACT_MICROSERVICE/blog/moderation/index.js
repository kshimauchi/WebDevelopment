const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// We need to emit the comment moderated
const app = express();
app.use(bodyParser.json());
// we only need a single route,
// moderated approved or rejects or pending
app.post('/events', (req, res) => {
  
});
app.listen(4003, () => {
    console.log('Listening on port 4003');
});