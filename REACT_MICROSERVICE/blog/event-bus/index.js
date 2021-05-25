const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.json());

//every event
const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  
  //most recent at the end
  events.push(event);


  //postsService
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  //commentsService
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  //queryService
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  //moderationService
   axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

  // in real life this is way more complexed
  app.get('/events', (req, res) => {
  
  //approach on synchronizing
    res.send(event);
  });

app.listen(4005, () => {
  console.log("Listening on 4005");
});
