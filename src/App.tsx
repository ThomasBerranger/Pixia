import Header from "./Layout/Header.tsx"
import Footer from "./Layout/Footer.tsx"
import {Route, Routes} from "react-router-dom"
import Admin from "./Admin/Admin.tsx"
import Game from "./Game/Game.tsx"
import User from "./User/User.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"

function App() {
    return (
        <>
            <Header/>
            <main className={'w-full flex items-center justify-center'}>
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
