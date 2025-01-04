const express = require('express')
const cors = require('cors');
const imageRouter = require("./routes/imageRoutes.js")
const userRouter = require("./routes/userRoutes.js")
const aboutRouter = require("./routes/aboutPageRoutes.js")
const userEmailRouter = require("./routes/userEmailRoutes.js")
const cookieParser = require("cookie-parser")

const app = new express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials:true,
// }))

app.use(
    cors({
        origin: function (origin, callback) {
            if (origin) {
                callback(null, origin); // Allow the origin dynamically
            } else {
                callback(null, '*'); // Allow non-browser tools like Postman
            }
        },
        credentials: true, // Allow cookies and credentials
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())

// app.get("/",(req,res)=>{
//     res.send("server is ready") 
// })
app.use("/api",imageRouter)
app.use("/api",userRouter)
app.use("/api",aboutRouter)
app.use("/api",userEmailRouter)

app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        error : err.message || "Internal Server Error"
    })
})

module.exports = app;