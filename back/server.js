const express = require('express')
require("dotenv").config();
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
mongoose
    .connect(process.env.dbUrl)
      .then(() => console.log("Connected to Mongodb"))
      .then(() => {
        app.listen(PORT);
        console.log(`Server is running on port ${PORT}`);
      })
      .catch((error) => console.error("Mongodb connection failed", error));


app.use('/api/data/loandata', require('./routes/loanRoute'))
app.use('/api/data/ratelock', require('./routes/rateLockRoute'))
app.use('/api/data/waiver', require('./routes/waiverRoute'))
app.get("*", (req, res) =>{
  res.status(404)
  res.send(`Available routes on this port ${PORT}
        1. http://localhost:5000/api/data/ratelock   
        2. http://localhost:5000/api/data/loandata
        3. http://localhost:5000/api/data/waiver`)
});