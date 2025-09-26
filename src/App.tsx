import Header from "./Layout/Header.tsx"
import Footer from "./Layout/Footer.tsx"
import {Route, Routes} from "react-router-dom"
import Admin from "./components/Admin/Admin.tsx"
import Game from "./components/Game/Game.tsx"
import User from "./components/User/User.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"

function App() {
    return (
        <>
            <Header/>
            <main className={'w-full flex justify-center'}>
                <Routes>
                    <Route path="/" element={<Game/>}/>
                    <Route path="/user" element={<User/>}/>
                    <Route path="/admin" element={
                        <ProtectedRoute requiredRole={"ROLE_ADMIN"}>
                            <Admin/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
