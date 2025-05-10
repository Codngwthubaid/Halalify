export interface Songs {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Albums {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Songs[];
}


export interface Stats {
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    uniqueArtists: number;
}


export interface NewFile {
    image: File | null,
    audio: File | null
}

export interface NewSong {
    title: string,
    artist: string,
    duration: number,
    album: string | null
}

export interface NewAlbum {
    title: string,
    artist: string,
    releaseYear: number
}


export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    _id: string;
    fullName: string;
    imageUrl: string;
    clerkId: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}