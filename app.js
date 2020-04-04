var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose")
mongoose.connect("mongodb+srv://atayl16:<password>@alisha-fjrqz.mongodb.net/alisha?retryWrites=true&w=majority", {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://atayl16:12121430@alisha-fjrqz.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Use this to create a campground if you wipe the DB (but try not to break it so bad you need to wipe it!)
// Campground.create(
//      {
//          name: "Salmon Creek", 
//          image: "https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197_960_720.jpg",
//          description: "This is a lovely campground with a creek... that has salmon in it!"
         
//      },
//      function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("index",{campgrounds:allCampgrounds});
       }
    });
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	 var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");	
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(3000, function() { 
  console.log('The YelpCamp server has started'); 
});