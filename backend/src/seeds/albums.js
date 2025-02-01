import mongoose from "mongoose";
import { Nasheed } from "../models/nasheeds.model.js"
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        // Clear existing data
        await Album.deleteMany({});
        await Nasheed.deleteMany({});

        // First, create all nasheeds
        const createdNasheeds = await Nasheed.insertMany([
            {
                title: "City Rain",
                artist: "Urban Echo",
                imageUrl: "/cover-images/7.jpg",
                audioUrl: "/nasheeds/7.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Neon Lights",
                artist: "Night Runners",
                imageUrl: "/cover-images/5.jpg",
                audioUrl: "/nasheeds/5.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36, // 0:36
            },
            {
                title: "Urban Jungle",
                artist: "City Lights",
                imageUrl: "/cover-images/15.jpg",
                audioUrl: "/nasheeds/15.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 36, // 0:36
            },
            {
                title: "Neon Dreams",
                artist: "Cyber Pulse",
                imageUrl: "/cover-images/13.jpg",
                audioUrl: "/nasheeds/13.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Summer Daze",
                artist: "Coastal Kids",
                imageUrl: "/cover-images/4.jpg",
                audioUrl: "/nasheeds/4.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 24, // 0:24
            },
            {
                title: "Ocean Waves",
                artist: "Coastal Drift",
                imageUrl: "/cover-images/9.jpg",
                audioUrl: "/nasheeds/9.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 28, // 0:28
            },
            {
                title: "Crystal Rain",
                artist: "Echo Valley",
                imageUrl: "/cover-images/16.jpg",
                audioUrl: "/nasheeds/16.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Starlight",
                artist: "Luna Bay",
                imageUrl: "/cover-images/10.jpg",
                audioUrl: "/nasheeds/10.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 30, // 0:30
            },
            {
                title: "Stay With Me",
                artist: "Sarah Mitchell",
                imageUrl: "/cover-images/1.jpg",
                audioUrl: "/nasheeds/1.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 46, // 0:46
            },
            {
                title: "Midnight Drive",
                artist: "The Wanderers",
                imageUrl: "/cover-images/2.jpg",
                audioUrl: "/nasheeds/2.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 41, // 0:41
            },
            {
                title: "Moonlight Dance",
                artist: "Silver Shadows",
                imageUrl: "/cover-images/14.jpg",
                audioUrl: "/nasheeds/14.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 27, // 0:27
            },
            {
                title: "Lost in Tokyo",
                artist: "Electric Dreams",
                imageUrl: "/cover-images/3.jpg",
                audioUrl: "/nasheeds/3.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 24, // 0:24
            },
            {
                title: "Neon Tokyo",
                artist: "Future Pulse",
                imageUrl: "/cover-images/17.jpg",
                audioUrl: "/nasheeds/17.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 39, // 0:39
            },
            {
                title: "Purple Sunset",
                artist: "Dream Valley",
                imageUrl: "/cover-images/12.jpg",
                audioUrl: "/nasheeds/12.mp3",
                plays: Math.floor(Math.random() * 5000),
                duration: 17, // 0:17
            },
        ]);

        // Create albums with references to nasheed IDs
        const albums = [
            {
                title: "Urban Nights",
                artist: "Various Artists",
                imageUrl: "/albums/1.jpg",
                releaseYear: 2024,
                nasheed: createdNasheeds.slice(0, 4).map((nasheed) => nasheed._id),
            },
            {
                title: "Coastal Dreaming",
                artist: "Various Artists",
                imageUrl: "/albums/2.jpg",
                releaseYear: 2024,
                nasheed: createdNasheeds.slice(4, 8).map((nasheed) => nasheed._id),
            },
            {
                title: "Midnight Sessions",
                artist: "Various Artists",
                imageUrl: "/albums/3.jpg",
                releaseYear: 2024,
                nasheed: createdNasheeds.slice(8, 11).map((nasheed) => nasheed._id),
            },
            {
                title: "Eastern Dreams",
                artist: "Various Artists",
                imageUrl: "/albums/4.jpg",
                releaseYear: 2024,
                nasheed: createdNasheeds.slice(11, 14).map((nasheed) => nasheed._id),
            },
        ];

        // Insert all albums
        const createdAlbums = await Album.insertMany(albums);

        // Update nasheeds with their album references
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumNasheeds = albums[i].nasheed;

            await Nasheed.updateMany({ _id: { $in: albumNasheeds } }, { albumId: album._id });
        }

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();