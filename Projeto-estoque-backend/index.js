require('dotenv').config();
const express = require('express');
const Routes = require("./src/config/routes");

let app = express();
app.use(express.json());
Routes(app);

app.listen(3001, () => {

    console.log(`Server runnin on http://127.0.0.1:3001!`);

});