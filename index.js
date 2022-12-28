const express = require("express")
const app = express()
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // Task Get Api
        app.get("/task/:email", async(req, res) => {
            const email = req.params.email
            const query = { email: email }
            const result = await taskCollection.find(query).toArray()
            res.send(result)
        })

        // Task Update
        app.put("/task/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                 isCompleted : true
                },
            };
            const result = await taskCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        // Task Not Completed Api
        app.put("/tasks/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                 isCompleted : false
                },
            };
            const result = await taskCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        // Task Delete
        app.delete("/task/:id", async(req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await taskCollection.deleteOne(query)
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