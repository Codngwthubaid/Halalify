import { User } from "../models/user.model.js"
import { Album } from "../models/album.model.js"
import { Nasheed } from "../models/nasheeds.model.js"

export const getStatsData = async (req, res, next) => {
    try {
        const [totalNasheeds, totalAlbums, totalUser, uniqueArtist] = await Promise.all(
            [
                Nasheed.countDocuments(),
                Album.countDocuments(),
                User.countDocuments(),
                Nasheed.aggregate(
                    [
                        { // get all the albums and combine them
                            $unionWith: {
                                coll: "albums",
                                pipeline: []
                            }
                        },
                        { // create a group for uniqure artist
                            $group: {
                                _id: "$artist"
                            }
                        },
                        { // now, count the artist
                            $count: "count"
                        }
                    ]
                )
            ]
        )

        res.status(200).json({
            totalAlbums,
            totalNasheeds,
            totalUser,
            totalArtist : uniqueArtist[0]?.count || 0
        })
    } catch (error) {
        next(error)
    }
}