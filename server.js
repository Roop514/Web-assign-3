/* import modules */
const express = require("express");
const app = express();
//const path = require("path");

/*load JSON files */
const paintings = require("./data/paintings-nested.json");
const artists = require("./data/artists.json");
const galleries = require("./data/galleries.json");

/* test server*/
app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});


/* get all paintings */
app.get("/api/paintings", (req, res) => {
    res.json(paintings);
});

/* get paintings by ID */
app.get("/api/painting/:id", (req, res) => {
    /* convert string to number */
    const id = Number(req.params.id); 
    const matches = paintings.filter(p => p.paintingID === id);

    if (matches.length === 0) {
        return res.json({ message: "No painting found with this ID" });
    }

    res.json(matches[0]); 
});

/* get paintings by gallery ID */
app.get("/api/painting/gallery/:id", (req, res) => {
    const id = Number(req.params.id); 
    const matches = paintings.filter(p => p.gallery.galleryID == req.params.id);
  
    if (matches.length === 0) {
        return res.json({ message: "No paintings for this gallery ID" });
    }

    res.json(matches);
});

/* get paintings by artist ID */
app.get("/api/painting/artist/:id", (req, res) => {
    const id = Number(req.params.id);  
    const matches = paintings.filter(p => p.artist.artistID === id);
  
    if (matches.length === 0) {
        return res.json({ message: "No paintings for this artist" });
    }

    res.json(matches);
}); 


/* get paintings by year range */
app.get("/api/painting/year/:min/:max", (req, res) => {
    const minYear = parseInt(req.params.min);
    const maxYear = parseInt(req.params.max);

    const matches = paintings.filter(p => p.yearOfWork >= minYear && p.yearOfWork <= maxYear);
    
    if (matches.length === 0) {
        return res.json({ message: "No paintings in this year range" });
    }

    res.json(matches);
});

/* get paintings by title */
app.get("/api/painting/title/:text", (req, res) => {
    const searchText = req.params.text.toLowerCase();
    const matches = paintings.filter(p => p.title.toLowerCase().includes(searchText));
  
    if (matches.length === 0) {
        return res.json({ message: "No paintings matching this title" });
    }

    res.json(matches);
});

/* get paintings by color name */
app.get("/api/painting/color/:name", (req, res) => {
    const colorName = req.params.name.toLowerCase();
    const matches = paintings.filter(p =>
        p.details.annotation.dominantColors.some(c => c.name.toLowerCase() === colorName)
    );

    if (matches.length === 0) {
        return res.json({ message: "No paintings matching this color" });
    }

    res.json(matches);
});


/* get all artists */
app.get("/api/artists", (req, res) => {
    res.json(artists);
});

/* get artists by country */
app.get("/api/artists/:country", (req, res) => {
    const countryParam = req.params.country.toLowerCase();

    const matches = artists.filter(a => a.country && a.country.toLowerCase() === countryParam);

    if (matches.length === 0) {
        return res.json({ message: "No artists from this country" });
    }

    res.json(matches);
});


/* get all galleries */
app.get("/api/galleries", (req, res) => {
    res.json(galleries);
});

/*  get galleries by country */
app.get("/api/galleries/:country", (req, res) => {
    const countryParam = req.params.country.toLowerCase();
    const matches = galleries.filter(g => g.country && g.country.toLowerCase() === countryParam);

    if (matches.length === 0) {
        return res.json({ message: "No galleries from this country" });
    }

    res.json(matches);
});


/* start the server */
const port = 8080;
app.listen(port, () => {
    console.log("Server running on port " + port);
});
