import { Songs } from "@/types";

interface GridSelectionLayoutProps {
    title: string | null;
    isLoading: boolean;
    songs: Songs[] | null;
}

export default function GridSelectionLayoutForSongs({ title, isLoading, songs }: GridSelectionLayoutProps) {
    console.log(title, isLoading, songs)
    return (
        <div>hello</div>
    )
}