import { User } from "../models/user.model.js"
import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"

export const getStats = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAlbums = await Album.countDocuments();
        const totalSongs = await Song.countDocuments();

        const uniqueArtistsResult = await Song.aggregate([
            {
            $unionWith: {
                coll: "albums",
                pipeline: []
            }
            },
            {
            $group: {
                _id: "$artist",
            }
            },
            {
            $count: "count"
            }
        ]);

        const uniqueArtists = uniqueArtistsResult.length > 0 ? uniqueArtistsResult[0].count : 0;

        res.status(200).json({ 
            success: true, 
            message: "Stats fetched successfully", 
            totalUsers, 
            totalAlbums, 
            totalSongs, 
            uniqueArtists 
        })
    } catch (error) {
        console.log("Error present in get stats route", error.message)
        next(error)
    }
}