import { Nasheed } from "../models/nasheeds.model.js"
import { Album } from "../models/album.model.js"
import cloudinary from "../lib/cloudinary.js"

// helper function to upload files on cloudinary
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        })
        return result.secure_url
    } catch (error) {
        console.log("Error in uploadToCloudinary : ", error);
        throw new Error("Error uploading to cloudinary");

    }
}


// Add Nasheeds
export const addNasheed = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) return res.status(400).json({ message: "Upload all the files " })

        const { title, artist, duration, albumId } = req.body
        const imageFile = req.files.imageFile
        const audioFile = req.files.audioFile

        const imageUrl = await uploadToCloudinary(imageFile)
        const audioUrl = await uploadToCloudinary(audioFile)

        // Creating a new instance in DB of nasheed
        const Nasheeds = new Nasheed({
            title,
            artist,
            duration,
            imageUrl,
            audioUrl,
            albumId: albumId || null
        })

        await Nasheeds.save()

        // Auto update if nasheed belongs any album
        if (albumId) {
            await Album.findByIdAndUpdate(Album, {
                $push: { nasheeds: Nasheeds._id }
            })
        }
        return res.status(201).json(Nasheeds)
    } catch (error) {
        next(error)
    }
}


// Delete Nasheeds
export const deleteNasheed = async (req, res, next) => {
    try {
        const { id } = req.params
        const nasheed = await Nasheed.findById(id)

        if (nasheed.albumId) {
            await Album.findByIdAndUpdate(Nasheed.albumId, {
                $pull: { Nasheed: nasheed._id }
            })
        }

        await Nasheed.findByIdAndDelete(id)
        res.status(200).json({ message: "Nasheed successfully deleted" })

    } catch (error) {
        next(error)
    }
}


// Create Album
export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releasedYr } = req.body
        const { imageFile } = req.files

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            releasedYr,
            imageUrl
        })

        await album.save();

        return res.status(201).json({ message: "Album successfully created" })
    } catch (error) {
        next(error)
    }
}


// Delete Album 
export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params
        await Nasheed.deleteMany({ albumId: id })
        await Album.findByIdAndDelete(id)
        return res.status(200).json({ message: "Album deleted successfully" })

    } catch (error) {
        next(error)
    }
}


// Check exist user is Admin OR Not
export const checkAdmin = async (req, res, next) => {
    try {
        res.status(200).json({ admin: true })
    } catch (error) {
        next(error)
    }
}