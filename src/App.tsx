import { lazy, Suspense, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Layouts/Header.tsx';
import Footer from './components/Layouts/Footer.tsx';
import Modal from './components/Modal.tsx';
import Alert from './components/Alert.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import InstallPWA from './components/InstallPWA.tsx';
import ImpersonateBanner from './atoms/ImpersonateBanner.tsx';
import Sidebar from './components/Layouts/SideBar.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { ModalProvider } from './contexts/modalContext.tsx';
import { AlertProvider } from './contexts/alertContext.tsx';
import { PATHS } from './constants/routes.ts';
import { ROLES } from './constants/roles.ts';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ValentineHearts from './atoms/ValentineHearts.tsx';

// Critical path
import GameContainer from './components/Game/GameContainer.tsx';
import UserContainer from './components/User/UserContainer.tsx';
import Leaderboard from './components/User/Leaderboard/Leaderboard.tsx';

// Lazy — public
const NotFound = lazy(() => import('./pages/NotFound.tsx'));
const UserDetails = lazy(
    () => import('./components/User/UserDetails/UserDetails.tsx')
);
const PasswordReset = lazy(
    () => import('./components/User/Form/PasswordReset.tsx')
);

// Lazy — authentifié
const Notification = lazy(() => import('./components/User/Notification/Notification.tsx'));
const UserGames = lazy(() => import('./components/User/Game/UserGames.tsx'));

// Lazy — admin
const AdminLayout = lazy(() => import('./components/Admin/Layout.tsx'));
const AdminUsersTable = lazy(
    () => import('./components/Admin/UsersTable.tsx')
);
const AdminGameGenerator = lazy(
    () => import('./components/Admin/GameGenerator/GameGenerator.tsx')
);
const AdminGameDashboard = lazy(
    () => import('./components/Admin/GameDashboard.tsx')
);
const AdminGameEdit = lazy(
    () => import('./components/Admin/GameEdit.tsx')
);
const Contribution = lazy(
    () => import('./components/Admin/Contribution.tsx')
);

// Lazy — static
const Changelog = lazy(() => import('./pages/Changelog.tsx'));
const CGU = lazy(() => import('./pages/CGU.tsx'));

function Loader() {
    return (
        <div className="min-h-[91vh] flex items-center justify-center">
            <div className="font-title text-retro-primary text-4xl animate-pulse">
                Chargement
            </div>
        </div>
    );
}

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

                    <Suspense fallback={<Loader />}>
                        <Routes>
                            {/* ===== Game ===== */}
                            <Route
                                path={PATHS.HOME}
                                element={<GameContainer />}
                            />
                            <Route
                                path={PATHS.GAME_BY_DATE}
                                element={<GameContainer />}
                            />

                            {/* ===== Me ===== */}
                            <Route path={PATHS.ME}>
                                <Route index element={<UserContainer />} />
                                <Route
                                    element={
                                        <ProtectedRoute>
                                            <Outlet />
                                        </ProtectedRoute>
                                    }
                                >
                                    <Route
                                        path={PATHS.ME_GAMES}
                                        element={<UserGames />}
                                    />
                                    <Route
                                        path={PATHS.ME_NOTIFICATIONS}
                                        element={<Notification />}
                                    />
                                </Route>
                            </Route>

                            {/* ===== Users ===== */}
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

                            {/* ===== Auth ===== */}
                            <Route
                                path={PATHS.FORGOT_PASSWORD}
                                element={<PasswordReset />}
                            />
                            <Route
                                path={PATHS.PASSWORD_RESET}
                                element={<PasswordReset />}
                            />

                            {/* ===== Admin ===== */}
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

                            {/* ===== Super Admin ===== */}
                            <Route
                                path={PATHS.ADMIN}
                                element={
                                    <ProtectedRoute
                                        requiredRole={ROLES.SUPER_ADMIN}
                                    >
                                        <Outlet />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    path={PATHS.ADMIN_USERS}
                                    element={<AdminUsersTable />}
                                />
                            </Route>

                            {/* ===== Static ===== */}
                            <Route
                                path={PATHS.CHANGELOG}
                                element={<Changelog />}
                            />
                            <Route path={PATHS.CGU} element={<CGU />} />

                            {/* ===== 404 ===== */}
                            <Route
                                path={PATHS.NOT_FOUND}
                                element={<NotFound />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>

                <Footer />
                <Modal />
            </ModalProvider>
        </AlertProvider>
    );
}

export default App;
