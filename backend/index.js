const express = require('express');
const { connectDB } = require('./db/connectDB');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoute = require("./routes/userRoute");
const emailRoute = require("./routes/emailRoute");

connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'https://gmail-clone-frontend-six.vercel.app',
    credentials: true
};
app.use(cors(corsOptions));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`)
});