import Header from "./Layout/Header.tsx";
import Footer from "./Layout/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import Admin from "./Admin/Admin.tsx";
import Game from "./Game/Game.tsx";

function App() {
    return (
        <>
            <Header/>
            <main className={'w-full bg-amber-200 flex items-center justify-center'}>
                <Routes>
                    <Route path="/" element={<Game/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
