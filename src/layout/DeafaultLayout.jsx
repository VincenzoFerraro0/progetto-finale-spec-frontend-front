import { Outlet } from "react-router-dom";
import Header from "../section/Header";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-black p-6">
                <Outlet />
            </main>
        </>
    )
}