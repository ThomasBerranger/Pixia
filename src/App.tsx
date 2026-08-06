import { lazy, Suspense, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header.tsx';
import Footer from './layouts/Footer.tsx';
import Modal from './components/Shared/Modal.tsx';
import Alert from './components/Shared/Alert.tsx';
import ScrollToTop from './layouts/ScrollToTop.tsx';
import InstallPWA from './layouts/InstallPWA.tsx';
import AppUpdateManager from './components/Shared/AppUpdateManager.tsx';
import ImpersonateBanner from './layouts/ImpersonateBanner.tsx';
import NotificationWatcher from './components/Shared/NotificationWatcher.tsx';
import UrlAlertWatcher from './components/Shared/UrlAlertWatcher.tsx';
import Sidebar from './layouts/SideBar.tsx';
import ProtectedRoute from './layouts/ProtectedRoute.tsx';
import { ModalProvider } from './contexts/modalContext.tsx';
import { AlertProvider } from './contexts/alertContext.tsx';
import { PATHS } from './constants/routes.ts';
import { ROLES } from './constants/roles.ts';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Critical path
import GameContainer from './components/Game/GameContainer.tsx';
import UserContainer from './components/User/UserContainer.tsx';
import Leaderboard from './components/User/Leaderboard/Leaderboard.tsx';

// Lazy — public
const NotFound = lazy(() => import('./pages/NotFound.tsx'));
const UserDetails = lazy(
    () => import('./components/User/UserDetails/UserDetails.tsx')
);
const PasswordReset = lazy(() => import('./components/Auth/PasswordReset.tsx'));

// Lazy — authentifié
const Notification = lazy(
    () => import('./components/User/Notification/Notification.tsx')
);
const UserGames = lazy(() => import('./components/User/Game/List.tsx'));
const UserGameForm = lazy(() => import('./pages/GameForm.tsx'));
const UserGeneratedGames = lazy(
    () => import('./components/User/Game/Generated.tsx')
);
const UserGameDetail = lazy(() => import('./components/User/Game/Detail.tsx'));

// Lazy — admin
const AdminPendingGames = lazy(
    () => import('./components/Admin/Game/Pending.tsx')
);
const AdminGameGenerator = lazy(
    () => import('./components/SuperAdmin/GameGenerator.tsx')
);
const Supervision = lazy(
    () => import('./components/Admin/Game/Supervision.tsx')
);
const AdminDashboard = lazy(() => import('./components/Admin/Dashboard.tsx'));

// Lazy — super admin
const SuperAdminDashboard = lazy(
    () => import('./components/SuperAdmin/Dashboard.tsx')
);
const SuperAdminUsers = lazy(() => import('./components/SuperAdmin/Users.tsx'));
const SuperAdminContributions = lazy(
    () => import('./components/SuperAdmin/Contribution.tsx')
);
const SuperAdminGameDashboard = lazy(
    () => import('./components/SuperAdmin/Games.tsx')
);
const SuperAdminActivity = lazy(
    () => import('./components/SuperAdmin/Activity/Activity.tsx')
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
                <AppUpdateManager />
                <ImpersonateBanner />
                <NotificationWatcher />
                <UrlAlertWatcher />

                <Header
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="bg-gradient-to-b from-retro-bg to-retro-surface text-retro-text -z-2">
                    {/*{new Date().getMonth() === 1 &&*/}
                    {/*    new Date().getDate() >= 9 &&*/}
                    {/*    new Date().getDate() < 16 && <ValentineHearts />}*/}

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
                                        path={PATHS.ME_GAME_NEW}
                                        element={<UserGameForm key="new" />}
                                    />
                                    <Route
                                        path={PATHS.ME_GAME_FORM}
                                        element={<UserGameForm key="edit" />}
                                    />
                                    <Route
                                        path={PATHS.ME_GAMES_GENERATED}
                                        element={<UserGeneratedGames />}
                                    />
                                    <Route
                                        path={PATHS.ME_GAME_DETAIL}
                                        element={<UserGameDetail />}
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
                                <Route index element={<AdminDashboard />} />
                                <Route
                                    path={PATHS.ADMIN_PENDING_GAMES}
                                    element={<AdminPendingGames />}
                                />
                                <Route
                                    path={PATHS.ADMIN_GAME_EDIT}
                                    element={<Supervision />}
                                />
                            </Route>

                            {/* ===== Super Admin ===== */}
                            <Route
                                path={PATHS.SUPER_ADMIN}
                                element={
                                    <ProtectedRoute
                                        requiredRole={ROLES.SUPER_ADMIN}
                                    >
                                        <Outlet />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    path={PATHS.SUPER_ADMIN}
                                    element={<SuperAdminDashboard />}
                                />
                                <Route
                                    path={PATHS.SUPER_ADMIN_USERS}
                                    element={<SuperAdminUsers />}
                                />
                                <Route
                                    path={PATHS.SUPER_ADMIN_GAMES}
                                    element={<SuperAdminGameDashboard />}
                                />
                                <Route
                                    path={PATHS.SUPER_ADMIN_CONTRIBUTIONS}
                                    element={<SuperAdminContributions />}
                                />
                                <Route
                                    path={PATHS.SUPER_ADMIN_GENERATOR}
                                    element={<AdminGameGenerator />}
                                />
                                <Route
                                    path={PATHS.SUPER_ADMIN_ACTIVITY}
                                    element={<SuperAdminActivity />}
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
