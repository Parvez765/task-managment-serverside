const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000

// MiddleWare
app.use(cors())
app.use(express.json())
require("dotenv").config()

app.get("/", (req, res) => {
    res.send("Server is Running")
})

app.listen(port, ()=> {
    console.log("Port is running at", port)
})