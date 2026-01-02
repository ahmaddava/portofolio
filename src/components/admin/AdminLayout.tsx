import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, User, Wrench, ArrowLeft, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
        { to: '/admin/profile', icon: User, label: 'Profile' },
        { to: '/admin/techstack', icon: Wrench, label: 'Tech Stack' },
    ];

    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-gray-950 flex relative">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-500 text-xs">Manage portfolio</p>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex w-64 bg-gray-900 border-r border-gray-800 p-4 flex-col">
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-500 text-sm">Manage your portfolio</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <a
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mt-4"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Site</span>
                </a>
            </aside>

            {/* Sidebar - Mobile (Overlay) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeSidebar}
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-gray-900 border-r border-gray-800 p-4 flex flex-col z-50"
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                                    <p className="text-gray-500 text-sm">Manage your portfolio</p>
                                </div>
                                <button
                                    onClick={closeSidebar}
                                    className="p-2 text-gray-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex-1 space-y-2">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.end}
                                        onClick={closeSidebar}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                            }`
                                        }
                                    >
                                        <item.icon size={20} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            <a
                                href="/"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mt-4"
                            >
                                <ArrowLeft size={20} />
                                <span>Back to Site</span>
                            </a>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 overflow-auto pt-16 lg:pt-0">
                <div className="p-4 sm:p-6 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
