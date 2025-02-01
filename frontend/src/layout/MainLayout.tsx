import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";

const MainLayout = () => {

    const isMobile = false;
    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <ResizablePanelGroup direction="horizontal" className="flex flex-1 h-full overflow-hidden p-2">
                <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={25}>
                    <LeftSideBar />
                </ResizablePanel>
                <ResizableHandle className="w-0 transition-colors rounded-md bg-zinc-900" />
                <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                    <Outlet />
                </ResizablePanel>
                <ResizableHandle className="w-0 transition-colors rounded-md bg-zinc-900" />
                <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                    <RightSideBar />
                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    )
}

export default MainLayout
