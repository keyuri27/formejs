const express = require('express')
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express()

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true})); // encode # %

app.get('/*', (req, res) => {
console.log(req.url);
  res.render('index')
});

app.post('/', (req,res) => {
    var data = req.body;
    console.log(data);

//        var jsonObj = JSON.parse(data);
//        console.log(jsonObj);

        var jsonContent = JSON.stringify(data);
        console.log(jsonContent);

        fs.stat('output.json', (err, stat) => {

            if(err == null) {
                fs.appendFile("output.json",jsonContent+"\r\n", 'utf8', (err)=>{
                         console.log("JSON file has been updated");})
             }else if(err.code == 'ENOENT') {
                  fs.writeFile("output.json",jsonContent, 'utf8', (err)=>{
                         console.log("JSON file has been saved");})
                   }});

        //return res.send(req.query)  // Stores value as JSON object
        res.render('done');
});

app.listen(3000,() => {
  console.log('Server listening on port 3000!')
});