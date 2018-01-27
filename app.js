//declare and intialize the express constant
const express = require('express');
const app = express();

//define file stream
const fs = require('fs');

//register file watcher
const filewatcher = require('filewatcher');
const watcher = filewatcher();

//configure static directories
app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(express.static('bower_components'));  //work on bower configuration

//watch files
watcher.add('public/mail/contact_me.php');
watcher.add('public/css/agency.css');

//add event hanlder to watcher
watcher.on('change' , function(file , stat){

    console.log('file modified : %s %s' , file , stat);

    let date = new Date().toString();
    let trail = '>> file modified : ' + file + ' at ' + date + '; \n';

    fs.appendFile('log.txt' , trail, (err)=> {
        if(err)
             throw err;
        else
            console.log('file updated');
    } )
    if(!stat) console.log('deleted');
})

//route handler for default http
app.get('/' , (req, res) => 
    res.send('SnowCoder Initiation....')
)

//route handler for default http
app.get('/snowcoder' , (req, res) => 
    res.send('Expressly express')
)

app.listen(3000 , () => 
    console.log('Hello snow coder')
)