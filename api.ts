import express, {Request,Response} from "express"
import cors from "cors"
import {MongoClient,ObjectId} from "mongodb"
import {uri} from "./credentials"
const client = new MongoClient(uri)
const db = client.db("BocaCode")
const photosCollections = db.collection("photos")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",async (req: Request,res: Response)=> {
    const photos = await photosCollections.find({}).toArray()
    res.status(200).json(photos)
})

app.post("/like/:id", async (req: Request, res: Response)=> {
    const photoid = req.params.id
    console.log("/like/",photoid)
    let status = await photosCollections.updateOne({_id: new ObjectId(photoid)}, { $inc: {likes:1}})
    //let status = await photosCollections.findOneAndUpdate({"_id": new ObjectId(photoid)}, { $inc: {likes:1}})
    res.status(201).json(status)
});

const PORT = 5001
app.listen(PORT,()=> {
    console.log("we started on port",PORT)
})