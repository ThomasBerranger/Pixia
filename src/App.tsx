import Header from "./components/Layouts/Header.tsx"
import Footer from "./components/Layouts/Footer.tsx"
import {Outlet, Route, Routes} from "react-router-dom"
import Admin from "./components/Admin/Admin.tsx"
import GameContainer from "./components/Game/GameContainer.tsx"
import User from "./components/User/User.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import AdminGameGenerator from "./components/Admin/GameGenerator/AdminGameGenerator.tsx"
import AdminUserDashboard from "./components/Admin/Dashboard/AdminUserDashboard.tsx"
import AdminGameDashboard from "./components/Admin/Dashboard/AdminGameDashboard.tsx"
import AdminGameEdit from "./components/Admin/AdminGameEdit.tsx";
import Modal from "./components/Modal.tsx";
import {ModalProvider} from "./contexts/modalContext.tsx";

function App() {
    return (
        <ModalProvider>
            <Header/>

            <main className="bg-gradient-to-b from-retro-bg to-retro-surface text-retro-text">
                <Routes>
                    <Route path="/" element={<GameContainer/>}/>
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

            <Modal/>
        </ModalProvider>
    )
}

export default App
