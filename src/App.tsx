import Header from "./components/Layouts/Header.tsx"
import Footer from "./components/Layouts/Footer.tsx"
import {Outlet, Route, Routes} from "react-router-dom"
import AdminContainer from "./components/Admin/AdminContainer.tsx"
import GameContainer from "./components/Game/GameContainer.tsx"
import User from "./components/User/User.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import AdminGameGenerator from "./components/Admin/GameGenerator/AdminGameGenerator.tsx"
import AdminUserDashboard from "./components/Admin/Dashboard/AdminUserDashboard.tsx"
import AdminGameDashboard from "./components/Admin/Dashboard/AdminGameDashboard.tsx"
import AdminGameEdit from "./components/Admin/AdminGameEdit.tsx"
import Modal from "./components/Shared/Modal.tsx"
import {ModalProvider} from "./contexts/modalContext.tsx"
import Alert from "./components/Shared/Alert.tsx"
import {AlertProvider} from "./contexts/alertContext.tsx"
import { Analytics } from "@vercel/analytics/react"
import {SpeedInsights} from "@vercel/speed-insights/react";

function App() {
    return (

        <AlertProvider>
            <ModalProvider>
                <Analytics />
                <SpeedInsights />

                <Header/>

                <main className="bg-gradient-to-b from-retro-bg to-retro-surface text-retro-text">

                    <Alert/>

                    <Routes>
                        <Route path="/" element={<GameContainer/>}/>
                        <Route path="/me" element={<User/>}/>

                        <Route path="/admin" element={
                            <ProtectedRoute requiredRole={"ROLE_ADMIN"}>
                                <Outlet/>
                            </ProtectedRoute>
                        }>
                            <Route index element={<AdminContainer/>}/>
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
        </AlertProvider>
    )
}

export default App
