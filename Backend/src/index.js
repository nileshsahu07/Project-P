const dotenv = require('dotenv')
const connectToDB = require('./db/dbConnect.js')
const app = require('./app.js')

dotenv.config({
    path: "./.env"
})

connectToDB()
.then(()=>{
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`Server is listening on: ${process.env.PORT}`)
    })
})
.catch((error)=>console.log("MONGODB connection failed!!!: ", error))