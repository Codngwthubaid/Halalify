import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";
import songs from "../constants/songData.js"

config();

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		await Song.deleteMany({});
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();