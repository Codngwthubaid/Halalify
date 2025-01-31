import { Nasheed } from "../models/nasheeds.model.js"

// Get all the Nasheeds
export const getAllNasheeds = async (req, res, next) => {
    try {
        // -1 => descending => newest to oldest
        // 1 => ascending => oldest to newest
        const nasheeds = await Nasheed.find().sort({ createdAt: -1 })
        res.status(200).json(nasheeds)
    } catch (error) {
        next(error)
    }
}


// Feature Nasheeds
export const getFeatureNasheeds = async (req, res, next) => {
    try {
        // fetch 6 random nasheeds from DB using mongo's aggregate pipeline
        const nasheeds = await Nasheed.aggregate(
            [
                {
                    $sample: { size: 6 }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        artist: 1,
                        imageUrl: 1,
                        audioUrl: 1
                    }
                }
            ]
        )
        res.status(200).json(nasheeds)
    } catch (error) {
        next(error)
    }
}


// Made For You Nasheeds
export const getMadeForYouNasheeds = async (req, res, next) => {
    try {
        // fetch 4 random nasheeds from DB using mongo's aggregate pipeline
        const nasheeds = await Nasheed.aggregate(
            [
                {
                    $sample: { size: 4 }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        artist: 1,
                        imageUrl: 1,
                        audioUrl: 1
                    }
                }
            ]
        )
        res.status(200).json(nasheeds)
    } catch (error) {
        next(error)
    }
}


// Trending Nasheeds
export const getTrendingNasheeds = async (req, res, next) => {
    try {
        // fetch 4 random nasheeds from DB using mongo's aggregate pipeline
        const nasheeds = await Nasheed.aggregate(
            [
                {
                    $sample: { size: 4 }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        artist: 1,
                        imageUrl: 1,
                        audioUrl: 1
                    }
                }
            ]
        )
        res.status(200).json(nasheeds)
    } catch (error) {
        next(error)
    }
}