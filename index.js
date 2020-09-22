const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// SET UP EXPRESS
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port:  ${PORT}`));



// SET UP MONGOOSE 

