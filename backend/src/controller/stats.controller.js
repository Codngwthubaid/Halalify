import { User } from "../models/user.model.js"
import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"

export const getStats = async (req, res, next) => {
    try {
        const [totalUsers, totalAlbums, totalSongs, uniqueArtists] = await Promise.all([
            User.countDocuments(),
            Album.countDocuments(),
            Song.countDocuments(),

            Song.aggregate([
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
            ])
        ])

        res.status(200).json({ success: true, message: "Stats fetched successfully" }, { totalUsers, totalAlbums, totalSongs, uniqueArtists })
    } catch (error) {
        console.log("Error present in get stats route", error.message)
        next(error)
    }
}