const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("1");
})

app.post("/api/extract/:page", (req, res) => {
    res.send("1");
})

app.listen(process.env.PORT ?? 3000);