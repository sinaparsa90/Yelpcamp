let express = require("express");
let router = express.Router();



router.get("/", function(req,res){
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

router.post("/", function(req,res){
    
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


router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - shows more info about the campground

router.get("/:id", function(req, res){
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



module.exports = router;
