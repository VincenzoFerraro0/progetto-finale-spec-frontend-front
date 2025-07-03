import { Outlet } from "react-router-dom";
import Header from "../section/Header";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main>
                {Outlet}
            </main>
        </>
    )
}