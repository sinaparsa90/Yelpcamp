let express  = require("express");
let router   = express.Router();
let passport = require("passport");
let User     = require("../models/user");



// root route
router.get("/", function(req,res){
    res.render("landing")
});


router.get("/register", function(req, res){
    res.render("register");
})

// Show register form

router.post("/register", function(req, res){
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

router.get("/login", function(req, res){
    res.render("login")
})

// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
});

// Logout ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/")
});



module.exports = router;