const express = require("express");
const path = require("path");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectdb = require("./config/db");

const userRoutes = require("./routes/UserRoutes");
const loginRoutes = require("./routes/LoginRoutes");
const attendanceRoutes = require("./routes/AttendanceRoutes");

const port = 5000;

const cors = require("cors");




app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);



connectdb();



app.use(
    "/api",
    userRoutes
);



app.use(
    "/api",
    loginRoutes
);



app.use(
    "/api",
    attendanceRoutes
);




app.listen(port, () => {

    console.log(
        `Server is running at http://localhost:${port}`
    );

});