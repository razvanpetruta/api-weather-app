const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.city;
    const apiKey = "806b69b52ebfb2005de6604b4691e6b7";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);

            if(weatherData.cod === 200)
            {
                const temperature = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;

                res.write(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Weather App</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
                        <link rel="stylesheet" href="css/style.css">
                    </head>

                    <body>
                        <!-- Title Section -->
                        <section id="title">
                            <div class="container-fuild">
                            <div class="row">
                                <div class="col-md-6 center">
                                <h1>Check the weather</h1>
                                </div>
                                <div class="col-md-6">
                                <img class="title-image" src="images/title.svg" alt="Title" />
                                </div>
                            </div>
                            </div>
                        </section>

                        <!-- Content Section -->
                        <section id="content">
                            <div class="container-fuild">
                                <div class="row justify-content-center">
                                    <div class="col-md-6 col-custom">
                                    <form action="/" method="post">
                                        <div class="row justify-content-center">
                                        <label for="city">Please enter your city</label>
                                        </div>
                                        <div class="row justify-content-center">
                                        <input class="city" type="text" name="city" id="city" placeholder="${query}" />
                                        </div>
                                        <div class="row justify-content-center">
                                        <button type="submit" class="btn btn-outline-light">GO</button>
                                        </div>
                                    </form>
                                    </div>

                                    <div class="result col-md-6 col-custom">
                                        <h2>${query}</h2>
                                        <img
                                            src="http://openweathermap.org/img/wn/${icon}@2x.png"
                                            alt=""
                                            srcset=""
                                        />
                                        <h4>${temperature} °C</h4>
                                        <p>${description}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
                    </body>
                    </html>
                `);
            }
            else
            {
                res.write(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Weather App</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
                        <link rel="stylesheet" href="css/style.css">
                    </head>

                    <body>
                        <!-- Title Section -->
                        <section id="title">
                            <div class="container-fuild">
                            <div class="row">
                                <div class="col-md-6 center">
                                <h1>Check the weather</h1>
                                </div>
                                <div class="col-md-6">
                                <img class="title-image" src="images/title.svg" alt="Title" />
                                </div>
                            </div>
                            </div>
                        </section>

                        <!-- Content Section -->
                        <section id="content">
                            <div class="container-fuild">
                                <div class="row justify-content-center">
                                    <div class="col-md-6 col-custom">
                                    <form action="/" method="post">
                                        <div class="row justify-content-center">
                                        <label for="city">Please enter your city</label>
                                        </div>
                                        <div class="row justify-content-center">
                                        <input class="city" type="text" name="city" id="city" placeholder="${query}" />
                                        </div>
                                        <div class="row justify-content-center">
                                        <button type="submit" class="btn btn-outline-light">GO</button>
                                        </div>
                                    </form>
                                    </div>

                                    <div class="result col-md-6">
                                        <h2>City not found</h2>
                                        <img
                                        class = "error-img"
                                        src="./images/404.svg"
                                        alt="404 not found"
                                        srcset=""
                                        />
                                        <p>Verify if you typed the city correctly!</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
                    </body>
                    </html>
                `);
            }
            res.send();
        });
    });
});



app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000.");
});