import { Album } from "../models/album.model.js"
export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find()
        res.status(200).json({ success: true, message: "Albums fetched successfully", albums })
    } catch (error) {
        console.log("Error present in get all albums route", error.message)
        next(error)
    }
}

export const getAlbumById = async (req, res, next) => {
    try {
        const { id } = req.params
        const album = await Album.findById(id).populate("songs")
        if (!album) return res.status(404).json({ success: false, message: "Album not found" });
        else res.status(200).json({ success: true, message: "Album fetched successfully", album })

    } catch (error) {
        console.log("Error present in get album by id route", error.message)
        next(error)
    }
}