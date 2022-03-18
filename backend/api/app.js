const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { extract, status } = require("./controller");

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.post("/api/status", status);

app.post("/api/extract", extract);

app.listen(process.env.PORT ?? 3000);
