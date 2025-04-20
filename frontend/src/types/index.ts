export interface Songs {
    _id: string;
    title: string;
    artist: string;
    audioUrl: string;
    imageUrl: string;
    duration: number;
    albumId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Albums {
    _id: string;
    title: string;
    imageUrl: string;
    artist: string;
    releaseYear: string;
    songs: Songs[];
}