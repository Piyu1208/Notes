import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <Header />
            <main style={{padding: "20px"}}>
                <Outlet />
            </main>
        </>
    );
}


export default MainLayout;