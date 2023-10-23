const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;
const userMiddleware = require("./middlerware/authorized");
const movieRouter = require("./router/movies");
const routerError = require("./router/404");

app.use(cors());
app.use(userMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/movies", movieRouter);

app.use(routerError);

app.listen(port);