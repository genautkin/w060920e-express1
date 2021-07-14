//set express
const express = require('express')
const dateFormat = require("dateformat");
var bodyParser = require('body-parser');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required().min(2).max(70),
  email: Joi.string().required().email(),
  phone: Joi.number().integer().min(9),
  submit: Joi.string()
});

const getImg = require('./getImgs.js');



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
const port = process.env.PORT || 3000


//set static folder
const path = require("path");
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    
    res.render("index",{title:test()});
    });


    app.get("/contact*", (req, res) => {
      console.log(req.query)
      res.render("contact",{title:test()});
      });

app.get("/services*", (req, res) => {
     let array=  [{icon:"bxl-dribbble",title:"Lorem Ipsum",description:"Lorem ipsum dolor sit am"},
     {icon:"bxl-dribbble",title:"Lorem Ipsum",description:"Lorem ipsum dolor sit am"},
                 {icon:"bx-file",title:"Lorem Ipsum",description:"Lorem Ipsum description"}] 

      res.render("services",{myArray:array});
      });

app.get("/gallery", async (req, res) => {
        let arr = await getImg.getArrayImg2(20);
        console.log(arr)
        res.render("gallery",{myArray:arr});
        });

app.get("*", (req, res) => {
    
        res.render("index",{title:test()});
        });

app.post("/contact", (req, res) => {
            const { error, value } = contactSchema.validate(req.body);
            if (error) {
              res.render("contact",{title:test()});
              return;
            }

          let mes = ''
          if ( req && req.body &&  'submitNow' in  req.body){
            mes = 'We are going to call you now!'
          }
          let name = '';
          if (req.body.name) {
            name = req.body.name;
          }
          res.render("thankyou",{name:name,mes:mes});
          });

    
function test(){
  var now = new Date();
  return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
}

app.listen(port, () => {
  console.log('Server started on port:'+port+'!')
})