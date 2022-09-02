const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/login.html")
});



app.post("/", function(request, response){
    const FirstName= request.body.fname;
    const LastName= request.body.lname;
    const email = request.body.email;
    
    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields : {
                    FNAME : FirstName,
                    LNAME : LastName,

                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); 

    const url ="https://us17.api.mailchimp.com/3.0/lists/546d7a14d1";

    const options ={
        method: "POST",
        auth: "ishika:2de101562ab4a13c58b1ae8432a9f92b-us17"
    }
const req =  https.request(url , options , function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");

    }

       response.on("data", function(data){
         console.log(JSON.parse(data));
       })
    })
    req.write(jsonData);
    req.end();

});

app.post("/failure" , function(req , res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});

 




// API Key
// 2de101562ab4a13c58b1ae8432a9f92b-us17

// List id
// 546d7a14d1
