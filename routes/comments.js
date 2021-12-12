let express = require("express");
let router = express.Router();
let Campground = require("../models/comment")


// Comments new
router.get("/campgrounds/:id/comments/new", isLoggedIn ,  function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: campground}) 
        }
    })
    
})

// comments create
router.post("/campgrounds/:id/comments", function(req, res){
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
});


// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;