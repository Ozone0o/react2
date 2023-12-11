"use client"

import { useAppContext } from "@/components/appcontext"
import Menubar from "./Menubar"
import Toolbar from "./toolbar"
import ChatList from "./ChatList"


export default function Navigation() {
        const {
        state: { displayNavigation }
    } = useAppContext()
    return (
        <nav
            className={`${
                displayNavigation ? "" : "hidden"
            } flex flex-col relative h-full w-[260px] bg-sky-500 text-white p-2 rounded-r-2xl `}
        >
            <Menubar />
            <ChatList />
            <Toolbar />
        </nav>
    )
}