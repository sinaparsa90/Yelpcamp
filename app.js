var express = require("express")
var app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static( "public"));

app.set("view engine", "ejs");

const campgrounds = [
    {name: "Salmon creek" , image: "https://www.photosforclass.com/download/pb_2692058" },
    {name: "Granitte Hill" , image: "https://www.photosforclass.com/download/pb_1633957" },
    {name: "Salmon creek" , image: "https://www.photosforclass.com/download/pb_2692058" },
    {name: "Granitte Hill" , image: "https://www.photosforclass.com/download/pb_1633957" },
    {name: "Salmon creek" , image: "https://www.photosforclass.com/download/pb_2692058" },
    {name: "Granitte Hill" , image: "https://www.photosforclass.com/download/pb_1633957" },
    {name: "Salmon creek" , image: "https://www.photosforclass.com/download/pb_2692058" },
    {name: "Granitte Hill" , image: "https://www.photosforclass.com/download/pb_1633957" },
    {name: "Mountain Goats Rest" , image: "https://www.photosforclass.com/download/pb_81482" }
]


app.get("/", function(req,res){
    res.render("landing")
})

app.get("/campgrounds", function(req,res){
    
    res.render("campgrounds",{campgrounds:campgrounds})
})

app.post("/campgrounds", function(req,res){
    
//  get data from form and add to campgrounds
var name = req.body.name;
var image = req.body.image;
var newCampground= {name: name , image:image}
campgrounds.push(newCampground);
// redirect to campgrounds page
res.redirect("/campgrounds");

});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("Yelpcamp  has started")
})