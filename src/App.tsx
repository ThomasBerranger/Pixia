import Header from "./Layout/Header.tsx"
import Footer from "./Layout/Footer.tsx"
import {Outlet, Route, Routes} from "react-router-dom"
import Admin from "./components/Admin/Admin.tsx"
import Game from "./components/Game/Game.tsx"
import User from "./components/User/User.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import AdminGameGenerator from "./components/Admin/GameGenerator/AdminGameGenerator.tsx"
import AdminUserDashboard from "./components/Admin/Dashboard/AdminUserDashboard.tsx"
import AdminGameDashboard from "./components/Admin/Dashboard/AdminGameDashboard.tsx"
import AdminGameEdit from "./components/Admin/AdminGameEdit.tsx";

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
                            <Outlet/>
                        </ProtectedRoute>
                    }>
                        <Route index element={<Admin/>}/>
                        <Route path="user-dashboard" element={<AdminUserDashboard/>}/>
                        <Route path="game-generator" element={<AdminGameGenerator/>}/>
                        <Route path="game-dashboard" element={<AdminGameDashboard/>}/>
                        <Route path="games/:id" element={<AdminGameEdit/>}/>
                    </Route>
                </Routes>
            </main>
            <Footer/>
        </>
    )
}

export default App
