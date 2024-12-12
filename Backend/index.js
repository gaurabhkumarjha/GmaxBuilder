const express = require("express");
const cluster = require("cluster");
const path = require("path");
const os = require("os");
const app = express();
require('./DB/db');
const cors = require("cors");
const router = require('./Routes/routes');
const port = process.env.PORT || 8000;

const OS_Length = os.cpus().length


app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, "Image")));

app.use(router);
//app.use("/uploads", express.static("./Upload"));

if (cluster.isPrimary) {
    // Fork workers.
    for (let i = 0; i < OS_Length; i++) {
        cluster.fork();
    }
} else {
    app.get('/', (req, res) => {
        res.status(201).json("express running...");
    });


    app.listen(port, () => {
        console.log("server is running...");
    });
}