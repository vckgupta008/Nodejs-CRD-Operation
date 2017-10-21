//importing modules
var express =require('express');
var mongoose =require('mongoose');
var bodyparser =require('body-parser');
var cors=require('cors');
var path=require('path');

var app=express();

const route=require('./routes/route');

//connect to db
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo db successfully @27017");
});

//error connection
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log("Connection failed with error "+err); 
    }
    
});



//port no
const port = 3000;

//adding middleware cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

//testing server
app.get('/',(req, res)=>{
    res.send('foobar');
});

//binding app with port
app.listen(port,()=>{
    console.log("server starts at port:"+port);
});