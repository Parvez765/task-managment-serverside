const express = require("express")
const app = express()
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// MiddleWare
app.use(cors())
app.use(express.json())
require("dotenv").config()

// Database Setup


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xu0oole.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const taskCollection = client.db("todos").collection("taskCollection")

        // Task Post Api
        app.post("/task", async(req, res) => {
            const task = req.body
            const result = await taskCollection.insertOne(task)
            res.send(result)
        })
    }
    finally {
        
    }
}
run().catch(error=> console.error(error))



app.get("/", (req, res) => {
    res.send("Server is Running")
})

app.listen(port, ()=> {
    console.log("Port is running at", port)
})