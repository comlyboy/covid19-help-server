// cors gives permissin to  "GET, POST, PUT, PATCH, DELETE, OPTIONS" capability
// mongoose makes schema possible in mongo DB
// bodyparser exposes the body portion of an incoming request on "req.body"

import cors from "cors";
import express from "express";

import { ConnectDB } from "./db/connection";

import { CaseRoute } from "./routes/case.route";
import { UserRoute } from "./routes/user.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting to mongoDB database
ConnectDB();

// permissions
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

// For various routes
app.use("/api/v1", UserRoute);
app.use("/api/v1", CaseRoute);

app.get("/", (req: express.Request, res: express.Response): express.Response => {
    return res.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>Covid-19 help v1 Server</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    </head>
    <body class="bg-light">
        <nav class="navbar navbar-light bg-success">
            <span class="navbar-brand text-light mb-0 h1">Covid-19 help api server v.1</span>
        </nav>
        <div class="container pt-5">
            <div class="card text-center border-0">

                    <div class="card border-0 py-3 text-center">
                        <div class="h4 text-success">Present Day</div>
                        <div class="h6 mb-0 text-muted" id="div1"></div>
                    </div>
                    <div class="card-body mt-3 pt-2">
                        <img src="https://static.timesofisrael.com/blogs/uploads/2020/02/SARS-CoV2-virion-e1582409571559.png" style="height: 20rem;" alt="welcome_img">
                    </div>

            </div>
        </div>
        <nav class="navbar fixed-bottom d-flex justify-content-center bg-dark py-5">
            <span class="lead mb-0 text-light">Copyright  &#9400;2020.  <a target="_blank" class="text-success h5" href="https://twitter.com/Comlyboy"> Cornelius
            Okeke</a></span>
        </nav>
    </body>
    <script>
    var d = new Date()

    var para = document.createElement("p");
    var node = document.createTextNode(d);
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.appendChild(para);    </script>
    </html>
`);
});


export default app;
