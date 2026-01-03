import Header from './components/Layouts/Header.tsx';
import Footer from './components/Layouts/Footer.tsx';
import { Outlet, Route, Routes } from 'react-router-dom';
import AdminContainer from './components/Admin/AdminContainer.tsx';
import GameContainer from './components/Game/GameContainer.tsx';
import UserContainer from './components/User/UserContainer.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AdminGameGenerator from './components/Admin/GameGenerator/AdminGameGenerator.tsx';
import AdminUserDashboard from './components/Admin/Dashboard/AdminUserDashboard.tsx';
import AdminGameDashboard from './components/Admin/Dashboard/AdminGameDashboard.tsx';
import AdminGameEdit from './components/Admin/AdminGameEdit.tsx';
import Modal from './components/Modal.tsx';
import { ModalProvider } from './contexts/modalContext.tsx';
import Alert from './components/Alert.tsx';
import { AlertProvider } from './contexts/alertContext.tsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import NotFound from './components/NotFound.tsx';
import Contribution from './components/Admin/Contribution/Contribution.tsx';
import { ROUTES } from './constants/routes.ts';
import UserDetails from './components/User/UserDetails/UserDetails.tsx';
import InstallPWA from './components/InstallPWA.tsx';
import { useState } from 'react';
import Sidebar from './components/Layouts/SideBar.tsx';
import Changelog from './components/Changelog.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Notification from './components/User/Notification.tsx';
import PasswordReset from './components/User/Form/PasswordReset.tsx';
import Leaderboard from './components/User/Leaderboard/Leaderboard.tsx';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <AlertProvider>
            <ModalProvider>
                {import.meta.env.PROD && <Analytics />}
                {import.meta.env.PROD && <SpeedInsights />}

                <ScrollToTop />

                <InstallPWA />

                <Header
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="bg-gradient-to-b from-retro-bg to-retro-surface text-retro-text -z-2">
                    <Alert />

                    <Routes>
                        {/* 404 */}
                        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                        {/* Game */}
                        <Route path={ROUTES.HOME} element={<GameContainer />} />
                        <Route
                            path={ROUTES.GAME_BY_DATE()}
                            element={<GameContainer />}
                        />
                        {/* User */}
                        <Route path={ROUTES.USER} element={<UserContainer />} />
                        <Route
                            path={ROUTES.USER_SHOW()}
                            element={<UserDetails />}
                        />
                        <Route
                            path={ROUTES.USER_SPONSOR()}
                            element={<UserContainer />}
                        />
                        <Route
                            path={ROUTES.LEADERBOARD}
                            element={<Leaderboard />}
                        />
                        {/* Password reset */}
                        <Route
                            path={ROUTES.FORGOT_PASSWORD}
                            element={<PasswordReset />}
                        />
                        <Route
                            path={ROUTES.PASSWORD_RESET}
                            element={<PasswordReset />}
                        />
                        {/* Admin */}
                        <Route
                            path={ROUTES.ADMIN}
                            element={
                                <ProtectedRoute requiredRole={'ROLE_ADMIN'}>
                                    <Outlet />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<AdminContainer />} />
                            <Route
                                path={ROUTES.ADMIN_USERS}
                                element={<AdminUserDashboard />}
                            />
                            <Route
                                path={ROUTES.ADMIN_GENERATOR}
                                element={<AdminGameGenerator />}
                            />
                            <Route
                                path={ROUTES.ADMIN_GAMES}
                                element={<AdminGameDashboard />}
                            />
                            <Route
                                path={ROUTES.ADMIN_GAME_EDIT()}
                                element={<AdminGameEdit />}
                            />
                            <Route
                                path={ROUTES.ADMIN_CONTRIBUTIONS}
                                element={<Contribution />}
                            />
                        </Route>

                        <Route
                            path={ROUTES.USER_NOTIFICATIONS}
                            element={<Notification />}
                        />

                        <Route
                            path={ROUTES.CHANGELOG}
                            element={<Changelog />}
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />

                <Modal />
            </ModalProvider>
        </AlertProvider>
    );
}

export default App;
