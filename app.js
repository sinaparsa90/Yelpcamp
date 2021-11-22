let express       = require("express"),
    mongoose      = require("mongoose"),
    app           = express(),
    passport      = require("passport"),
    LocalStrategy = require ("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

// require routes
    let commentRoutes     = require ("./routes/comments"),
        campgroundsRoutes = require ("./routes/campgrounds"),
        indexRoutes        = require ("./routes/index");
        
    mongoose.connect("mongodb://localhost:27017/yelp_camp_v6",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));


app.set("view engine", "ejs"); 
seedDB();
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

app.use(commentRoutes);
app.use("/campgrounds" , campgroundsRoutes);
app.use("/", indexRoutes);


app.listen(3000, function(){
    console.log("Yelpcamp  has started")
});