import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"
import FriendsActivity from "./components/RightSidebar"
import AudioPlayer from "./components/AudioPlayer"
import PlayControls from "./components/PlayControls"

export default function MainLayout() {

    const [isMobile, setIsMobile] = useState(false)

    return (
        <div className="h-screen w-full flex justify-center items-center flex-col">
            <ResizablePanelGroup direction="horizontal">
                <AudioPlayer />
                <ResizablePanel defaultSize={20} maxSize={25} minSize={isMobile ? 0 : 15}>
                    <LeftSidebar />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={25} minSize={0} maxSize={30} collapsedSize={0}>
                    <FriendsActivity />
                </ResizablePanel>
            </ResizablePanelGroup>

            <PlayControls />
        </div>
    )
}