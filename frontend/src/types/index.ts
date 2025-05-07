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