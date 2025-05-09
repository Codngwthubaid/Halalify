import { Song } from "../models/song.model.js"
import { Album } from "../models/album.model.js"
import cloudinary from "../lib/cloudinary.js"

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto" });
        return result.secure_url
    } catch (error) {
        console.log("Error present in cloudinary upload", error.message)
        throw new error("Cloudinary upload error")
    }
}


export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) return res.status(400).json({ success: false, message: "Please upload all files" });

        const { title, artist, duration, albumId } = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile
        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)
        const song = new Song({ title, artist, duration, audioUrl, imageUrl, albumId: albumId ? albumId : null })
        await song.save();

        if (albumId) await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
        res.status(201).json({ success: true, message: "Song created successfully" })

    } catch (error) {
        console.log("Error present in create song route", error.message)
        next(error)
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params
        const song = await Song.findById(id)
        if (song.albumId) await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
        await Song.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Song deleted successfully" })

    } catch (error) {
        console.log("Error present in delete song route", error.message)
        next(error)
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body
        const { imageFile } = req.files
        const imageUrl = uploadToCloudinary(imageFile)
        const album = new Album({ title, artist, releaseYear, imageUrl })
        await album.save()
        res.status(201).json({ success: true, message: "Album created successfully" }, album)

    } catch (error) {
        console.log("Error present in create album route", error.message)
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params
        await Song.deleteMany({ albumId: id })
        await Album.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Album deleted successfully" })
    } catch (error) {
        consol.log("Error present in delete album route", error.message)
        next(error)
    }
}

export const checkAdmin = async (req, res,) => { res.status(200).json({ success: true, message: "You are an admin", isAdmin: true }) }