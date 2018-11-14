const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const server = require('http').Server(app);
//Req real time 
const io = require('socket.io')(server);

const moment = require('moment');


mongoose.connect(
  "mongodb://goweek:alc123@ds255253.mlab.com:55253/goweekandre-backend", 
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));


server.listen(3000, () => {
    console.log("Server running on port 3000," + moment().format("D/MMM/YY"));
});
//user: goweek pass: alc123