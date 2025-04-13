import { Song } from "../models/song.model.js"
import { Album } from "../models/album.model.js"
import cloudinary from "../lib/cloudinary.js"

const uploadToCloudinary = async (file) => {
    const result = await cloudinary.uploader.upload(file.tempFilePath,{resource_type: "auto"})
}


export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) return res.status(400).json({ success: false, message: "Please upload all files" });

        const { title, artist, duration, albumId } = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile
        const audioUrl = uploadToCloudinary(audioFile)
        const imageUrl = uploadToCloudinary(imageFile)
        const song = new Song({ title, artist, duration, audioUrl, imageUrl, albumId: albumId ? albumId : null })
        await song.save();

        if (albumId) await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
        res.status(200).json({ success: true, message: "Song created successfully" })

    } catch (error) {
        console.log("Error present in create song route", error.message)
        next(error)
    }
}