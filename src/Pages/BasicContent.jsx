import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function BasicContent() {
    return (
        <div className="flex min-h-screen bg-background dark:bg-gray-800 w-full">
            <div className="md:w-16">
                <Sidebar />
            </div>
            <main className="flex flex-col w-full container">
                <Outlet />
            </main>
        </div>
    )
}