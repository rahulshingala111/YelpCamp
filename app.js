const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground')

const app = express();


//Mongoose
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//POST method body parse
app.use(express.urlencoded({extended: true}));


// HOME 
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campgrounds', async(req, res) => {
   const campgrounds = await Campground.find({});
   res.render('campgrounds/index',{campgrounds})
})

app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new');
})

app.post('/campgrounds',async(req,res)=>{
    res.send(req.body);
})


app.get('/campgrounds/:id', async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show',{campground});
})
 



// Server Set up on PORT 3000
app.listen(3000,()=>{
    console.log("Server Started on PORT 3000.......");
})