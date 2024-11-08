const express = require("express");
require('./db/conn');
const employee = require("./models/employee")
const app = express();
const port = process.env.PORT || 8000;
const router = require("./routers/route")
// const cors = require("cors")

// app.use(cors({ origin: '*' }));
// app.options('*', cors())

app.use(express.json())
app.use(router)

app.get('/', function (req, res) {
    res.json({ "message": "Welcome to Node and Express projects." });
});

app.listen(port, () => {
    console.log(`connection is setup at  http://localhost:${port}`)
})