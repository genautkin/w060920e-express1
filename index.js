//set express
const express = require('express')
const app = express()

const port = 3000

//set static folder
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {

    res.render("index");
    });
    

app.listen(port, () => {
  console.log('Server started on port:'+port+'!')
})