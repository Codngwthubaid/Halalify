import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"
import AudioPlayer from "./components/AudioPlayer"
import PlayControls from "./components/PlayControls"
import { useEffect } from "react"
import RightSidebar from "./components/RightSidebar"

export default function MainLayout() {

    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

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
                {!isMobile && (
                    <>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={20} maxSize={25}>
                            <RightSidebar />
                        </ResizablePanel>
                    </>
                )}
            </ResizablePanelGroup>

            <PlayControls />
        </div>
    )
}