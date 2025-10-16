const express = require("express")
const cors = require("cors")
const app = express()
const { initilizeDatabase } = require("./db/db.connect")
const MeetUpApp = require("./models/meetup.models")
app.use(cors())
app.use(express.json())
initilizeDatabase()

async function createHomePage(homePage){
    try{
        const home = new MeetUpApp(homePage)
        const saveHome = await home.save()
        return saveHome
    }catch(error){
        console.log(error)
    }
}

app.post("/dashboard", async(req, res) => {
    try{
        const savedHome = await createHomePage(req.body)
        res.status(201).json({message: "Meeting added successfully", home: savedHome})

    }catch(error){
        res.status(500).json({error: "failed to add meeting."})
    }
})

async function readAllMeeting(meetings){
    try{
        const allMeeting = await MeetUpApp.find()
        return allMeeting

    }catch(error){
        console.log(error)
    }
}

app.get("/dashboard", async(req, res) => {
    try{
        const meeting = await readAllMeeting()
        if(meeting.length !== 0){
            res.json(meeting)
        } else{
            res.status(404).json({error: "no meeting found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch meetings."})
    }
})

async function readByEventType(byType){
    try{
        const meeting = await MeetUpApp.find({eventType: byType})
        return meeting
    }catch(error){
        console.log(error)
    }
}

app.get("/dashboard/eventType/:byType", async (req, res) => {
    try{
        const meeting = await readByEventType(req.params.byType)
        if(meeting.length !== 0){
            res.json(meeting)
        }else{
            res.status(404).json({error: "no meeting found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch meetings."})
    }
})

async function readByEventTitle(byTitle){
    try{
        const meeting = await MeetUpApp.find({title: byTitle})
        return meeting
    }catch(error){
        console.log(error)
    }
}

app.get("/dashboard/title/:byTitle", async (req, res) => {
    try{
        const meeting = await readByEventTitle(req.params.byTitle)
        if(meeting.length !== 0){
            res.json(meeting)
        }else{
            res.status(404).json({error: "no meeting found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to fetch meetings."})
    }
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on the PORT ${PORT}`)
})