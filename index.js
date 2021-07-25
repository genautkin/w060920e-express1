//set express
const express = require('express')
const dateFormat = require("dateformat");
var bodyParser = require('body-parser');
const Joi = require('joi');
const mysql = require('mysql');
const mongoose = require('mongoose');




const contactSchema = Joi.object({
  name: Joi.string().required().min(2).max(70),
  email: Joi.string().required().email(),
  phone: Joi.number().required().integer().min(9),
  message: Joi.string().required().min(2).max(70),
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

   //sql     
// app.post("/contact", (req, res) => {
//             const { error, value } = contactSchema.validate(req.body);
//             if (error) {
//               res.render("contact",{title:test()});
//               return;
//             }
 
//               const connection = mysql.createConnection({
//                 host: 'localhost',
//                 user: 'root',
//                 password: '',
//                 database: 'nodejsdb'
//               });
           
//               let sql = `INSERT INTO contact_log VALUES(null,?,?,?,?)`;
//               let dataArray = [req.body.name, req.body.email, req.body.phone,req.body.message];
           
//               connection.query(sql, dataArray, (error, results, fields) => {
           
//                 if (results.affectedRows) {
                  
//                   let mes = ''
//                   if ( req && req.body &&  'submitNow' in  req.body){
//                     mes = 'We are going to call you now!'
//                   }
//                   let name = '';
//                   if (req.body.name) {
//                     name = req.body.name;
//                   }
//                   res.render("thankyou",{name:name,mes:mes});
                  
//                 } else {
//                   console.log(error)
//                   res.render("contact",{title:test()});
//                 }
           
//               });
//             })

const contactSchemaMongo = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});
const ContactInfo = mongoose.model('ContactInfo', contactSchemaMongo);

app.post("/contact", (req, res) => {
  const { error, value } = contactSchema.validate(req.body);
  if (error) {
    res.render("contact",{title:test()});
    return;
  }
  mongoose.connect('mongodb://localhost/contact_log',{useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('connecting to mongodb!') )
    .catch( err => console.error('Could not connect to mongodb', err) );

    new ContactInfo({name:req.body.name, email:req.body.email, phone:req.body.phone,message:req.body.message}).save()
    .then(()=>{
 

        
        let mes = ''
        if ( req && req.body &&  'submitNow' in  req.body){
          mes = 'We are going to call you now!'
        }
        let name = '';
        if (req.body.name) {
          name = req.body.name;
        }
        res.render("thankyou",{name:name,mes:mes});
        
      }).catch((error)=>{
        console.log(error)
        res.render("contact",{title:test()});
      })
 
    });




         

    
function test(){
  var now = new Date();
  return dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
}

app.listen(port, () => {
  console.log('Server started on port:'+port+'!')
})