const mongoose = require("mongoose")

const appSchema = new mongoose.Schema({
    title: String,
    image: String,
    date: String,
    eventType: {
        type: String,
        enum: ['Offline Event', 'Online Event', 'Both'],
    }
},
{
    timestamps: true,
}
)

const MeetUpApp = mongoose.model("Meet up App", appSchema)
module.exports = MeetUpApp