//the point of this is creating a server to see if the Instagram username exists 200 or does not 404

const express = require("express"); //imports the express framework to create APIs or servers/routes

const fetch = require("node-fetch"); // enables HTTPs requests (like calling APIs)
//hypertext transfer protocol

const cors = require("cors"); // enables frontend to talk to backend
// cross origin resource sharing

const app = express() // creates an instance of the Express application

app.use(cors()) // enables CORS for incoming requests

/*

The next part will define GET route 

*/

console.log("Starting server...");


app.get("/check-username/:username", async (req,res) => {
    
    const { username } = req.params;

    try {
        const response = await fetch(`https://instagram.com/${username}/`,{

            // user-agent header to bypass
            headers: {
                "User-Agent":"Mozilla/5.0"
            }
        });

        if(response.status === 200){
            res.json({exists: true});
        } else if (response.status === 404) {
            res.json({exists: false});
        } else {
            res.status(500).json({error: "Unexpected response from Instagram :/"})
        }


        

    } catch (err) {

        res.status(500).json({error: "Failed to fetch Instagram profile :("});

    }

    app.listen(4000, () => {
        console.log("Server is running on http://localhost:4000");
    })



})

app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
})
