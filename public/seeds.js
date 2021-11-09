let mongoose = require ("mongoose");
let Campground = require ("./models/campground");
let Comment = require("./models/comment");

let data = [
    {name: "Fire nearcamp",
     image: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Can you imagine camping without making fire    orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!!!" 
    },
    {name: "camping in a cloudy day",
     image: "https://images.unsplash.com/photo-1571687949921-1306bfb24b72?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "you have to wait for rain every second!!!     orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
    },
    {name: "luxury camping",
     image: "https://images.unsplash.com/photo-1604920730770-fcbd72c19889?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGNhbXBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "If I just  had a car like that!!!!!    orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
    }

]

function seedDB(){
    // Remove all campgrounds
 Campground.remove({}, function(err){
   if(err){ console.log(err)
    }else{
    console.log("removed campgrounds!")
    }
    //   add a few campgrounds
   data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
            console.log(err)
        }else{
         console.log("added a campground!");
         //  create a comment
         Comment.create(
           {
            text: "This place is great, but I wish there was internet",
            author: "Homer"
           }, function(err,comment){
            if(err){
              console.log(err)

            } else{
            campground.comments.push(comment)
            campground.save();
            console.log("Created new comment!");
             }
          });
        }
      })
    });

 });



}

module.exports = seedDB;