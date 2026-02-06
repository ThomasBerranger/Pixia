import Header from './components/Layouts/Header.tsx';
import Footer from './components/Layouts/Footer.tsx';
import { Outlet, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/Admin/AdminLayout.tsx';
import GameContainer from './components/Game/GameContainer.tsx';
import UserContainer from './components/User/UserContainer.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import AdminGameGenerator from './components/Admin/GameGenerator/AdminGameGenerator.tsx';
import AdminUsersTable from './components/Admin/AdminUsersTable.tsx';
import AdminGameDashboard from './components/Admin/AdminGameDashboard.tsx';
import AdminGameEdit from './components/Admin/AdminGameEdit.tsx';
import Modal from './components/Modal.tsx';
import { ModalProvider } from './contexts/modalContext.tsx';
import Alert from './components/Alert.tsx';
import { AlertProvider } from './contexts/alertContext.tsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import NotFound from './components/NotFound.tsx';
import Contribution from './components/Admin/Contribution/Contribution.tsx';
import { PATHS } from './constants/routes.ts';
import UserDetails from './components/User/UserDetails/UserDetails.tsx';
import InstallPWA from './components/InstallPWA.tsx';
import { useState } from 'react';
import Sidebar from './components/Layouts/SideBar.tsx';
import Changelog from './components/Changelog.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Notification from './components/User/Notification.tsx';
import PasswordReset from './components/User/Form/PasswordReset.tsx';
import Leaderboard from './components/User/Leaderboard/Leaderboard.tsx';
import UserGames from './components/User/Game/UserGames.tsx';
import ImpersonateBanner from './atoms/ImpersonateBanner.tsx';
import { ROLES } from './constants/roles.ts';
import ValentineHearts from './atoms/ValentineHearts.tsx';
import CGU from './components/CGU.tsx';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <AlertProvider>
            <ModalProvider>
                {import.meta.env.PROD && <Analytics />}
                {import.meta.env.PROD && <SpeedInsights />}

                <ScrollToTop />

                <InstallPWA />

                <ImpersonateBanner />

                <Header
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="bg-gradient-to-b from-retro-bg to-retro-surface text-retro-text -z-2">
                    {new Date().getMonth() === 1 &&
                        new Date().getDate() >= 9 &&
                        new Date().getDate() < 16 && <ValentineHearts />}

                    <Alert />

                    <Routes>
                        {/* 404 */}
                        <Route path={PATHS.NOT_FOUND} element={<NotFound />} />
                        {/* Game */}
                        <Route path={PATHS.HOME} element={<GameContainer />} />
                        <Route
                            path={PATHS.GAME_BY_DATE}
                            element={<GameContainer />}
                        />
                        {/* User */}
                        <Route path={PATHS.USER} element={<UserContainer />} />
                        <Route
                            path={PATHS.USER_SHOW}
                            element={<UserDetails />}
                        />
                        <Route
                            path={PATHS.USER_SPONSOR}
                            element={<UserContainer />}
                        />
                        <Route
                            path={PATHS.LEADERBOARD}
                            element={<Leaderboard />}
                        />
                        <Route
                            path={PATHS.USER_GAMES}
                            element={<UserGames />}
                        />
                        {/* Password reset */}
                        <Route
                            path={PATHS.FORGOT_PASSWORD}
                            element={<PasswordReset />}
                        />
                        <Route
                            path={PATHS.PASSWORD_RESET}
                            element={<PasswordReset />}
                        />
                        {/* Admin */}
                        <Route
                            path={PATHS.ADMIN}
                            element={
                                <ProtectedRoute requiredRole={ROLES.ADMIN}>
                                    <Outlet />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<AdminLayout />} />
                            <Route
                                path={PATHS.ADMIN_GENERATOR}
                                element={<AdminGameGenerator />}
                            />
                            <Route
                                path={PATHS.ADMIN_GAMES}
                                element={<AdminGameDashboard />}
                            />
                            <Route
                                path={PATHS.ADMIN_GAME_EDIT}
                                element={<AdminGameEdit />}
                            />
                            <Route
                                path={PATHS.ADMIN_CONTRIBUTIONS}
                                element={<Contribution />}
                            />
                        </Route>

                        {/* Super Admin */}
                        <Route
                            path={PATHS.ADMIN}
                            element={
                                <ProtectedRoute requiredRole={ROLES.SUPER_ADMIN}>
                                    <Outlet />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                path={PATHS.ADMIN_USERS}
                                element={<AdminUsersTable />}
                            />
                        </Route>

                        <Route
                            path={PATHS.USER_NOTIFICATIONS}
                            element={<Notification />}
                        />

                        <Route
                            path={PATHS.CHANGELOG}
                            element={<Changelog />}
                        />

                        <Route path={PATHS.CGU} element={<CGU />} />

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
