var express = require("express"),
    mongoose= require("mongoose"),
    app     = express();
    

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static( "public"));

app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

 var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Salmon creek" , 
//     image: "https://www.photosforclass.com/download/pb_2692058" ,
//     description: "This is a huge granite hill, no bathrooms, No water, Beautiful granite"
// }, function(err, campground){
//     if(err){
//         console.log("err")
//     }else{
//         console.log(campground)
//     }
// });


app.get("/", function(req,res){
    res.render("landing")
});

app.get("/campgrounds", function(req,res){
    // get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else{
            res.render("index",{campgrounds:allCampgrounds})
        }
    });
});

app.post("/campgrounds", function(req,res){
    
 //  get data from form and add to campgrounds
 var name = req.body.name;
 var image = req.body.image;
 var desc = req.body.description;
 var newCampground= {name: name , image:image , description: desc}
 // create a new campground and save it to the DB
 Campground.create(newCampground, function(err, newlyCreated){
      if(err){
        console.log(err)
       } else {
        // redirect to campgrounds page
        res.redirect("/campgrounds")
       }
    });
});



app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// SHOW - shows more info about the campground

app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    })
    req.params.id
    
    
});

app.listen(3000, function(){
    console.log("Yelpcamp  has started")
});