import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    releasedYr: {
        type: Number,
        require: true
    },
    nasheed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Nasheed'
        }
    ]
}, {
    timestamps: true
})


export const Album = mongoose.model("Album", albumSchema);
