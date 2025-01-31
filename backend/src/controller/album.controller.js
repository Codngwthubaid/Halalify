import { Album } from "../models/album.model.js"

// Get All Albums
export const getAllAlbums = async (req, res, next) => {
    try {
        const album = await Album.find()
        res.status(200).json(album)
    } catch (error) {
        next(error)
    }
}


// Find Album by ID
export const getAlbumById = async (req, res, next) => {
    try {
        const {albumId} = req.params;
        const album = await Album.findById(albumId).populate("nasheed")
    
        if(!album) return res.status(400).json({message : "Album not found"})
        res.json(album)

    } catch (error) {
        next(error)
    }
}