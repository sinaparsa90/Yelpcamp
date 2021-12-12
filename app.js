let express       = require("express"),
    mongoose      = require("mongoose"),
    app           = express(),
    passport      = require("passport"),
    LocalStrategy = require ("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds")
    
seedDB();   //seed the data base
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again cookie is my faverite dog " ,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})




mongoose.connect("mongodb://localhost:27017/yelp_camp_v6",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));


app.set("view engine", "ejs");

//SCHEMA SETUP


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
    console.log(req.user)
    // get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user})
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
    res.render("campgrounds/new");
});

// SHOW - shows more info about the campground

app.get("/campgrounds/:id", function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err){
            console.log(err);
        }else{
                console.log(foundCampground)
                // render show template with that campground
                res.render("campgrounds/show", {campground: foundCampground});
              }
    });

});

// ==============
// COMMENTS ROUTES
// ==============
app.get("/campgrounds/:id/comments/new", isLoggedIn ,  function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: campground}) 
        }
    })
    
})

app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        }else{
             // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground show page
                    res.redirect('/campgrounds/'+campground._id)

                }
            })
        }
    })
    
    
    

    
})
//   ==========
//  AUTH ROUTES
//   ==========

app.get("/register", function(req, res){
    res.render("register");
})

// Show register form

app.post("/register", function(req, res){
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
       if(err){
        console.log(err);
        return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        })
    
  });
});

// show login form

app.get("/login", function(req, res){
    res.render("login")
})

// handling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

// Logout ROUTE
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/")
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("Yelpcamp  has started")
});