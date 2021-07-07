//set express
const express = require('express')
const dateFormat = require("dateformat");
var bodyParser = require('body-parser')



const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
const port = 3000


//set static folder
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    
    res.render("index",{title:test()});
    });


    app.get("/contact*", (req, res) => {
      res.render("contact",{title:test()});
      });

app.get("/services*", (req, res) => {
     let array=  [{icon:"bxl-dribbble",title:"Lorem Ipsum",description:"Lorem ipsum dolor sit am"},
     {icon:"bxl-dribbble",title:"Lorem Ipsum",description:"Lorem ipsum dolor sit am"},
                 {icon:"bx-file",title:"Lorem Ipsum",description:"Lorem Ipsum description"}] 

      res.render("services",{myArray:array});
      });

app.get("*", (req, res) => {
    
        res.render("index",{title:test()});
        });

app.post("/thankyou", (req, res) => {
          console.log(req.body)
          let name = '';
          if (req.body.name) {
            name = req.body.name;
          }
          res.render("thankyou",{name:name});
          });

    
function test(){
  var now = new Date();
  return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
}

app.listen(port, () => {
  console.log('Server started on port:'+port+'!')
})