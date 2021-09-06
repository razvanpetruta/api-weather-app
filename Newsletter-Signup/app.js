const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");

const app = express();

// to manipulate the form
app.use(express.urlencoded({extended: true}));

// to use css
app.use(express.static(__dirname));

// send the signup page to the browser as soon as a request is made on localhost:3000
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// setting up mailchimp
mailchimp.setConfig({
    apiKey: "my key",
    server: "sth"
});

// when the signup button is pressed
app.post("/", function(req, res) {
    // info from form
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // list id
    const listId = "my id";

    // object with the user data
    const subsribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    // uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subsribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subsribingUser.firstName,
                LNAME: subsribingUser.lastName
            }
        });

        // if all goes well show the success page
        res.sendFile(__dirname + "/success.html");
    }

    // if there is an error show the failure page
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});
