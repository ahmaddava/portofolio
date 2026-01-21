import { NavLink } from 'react-router-dom';
import { Home, Layers, Briefcase, FolderGit2, Github, Mail, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Sidebar = () => {
    const { profile } = useData();

    const navItems = [
        { name: 'Overview', path: '/', icon: Home },
        { name: 'Tech Stack', path: '/tech-stack', icon: Layers },
        { name: 'Projects', path: '/projects', icon: FolderGit2 },
        { name: 'Experience', path: '/experience', icon: Briefcase },
    ];

    return (
        <aside className="w-full">
            {/* Profile Card */}
            <div className="mb-6 p-6 rounded-2xl bg-canvas-subtle border border-border-default">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-lg opacity-40"></div>
                        <img
                            src={profile.profile_image}
                            alt={profile.name}
                            className="relative w-28 h-28 rounded-full border-4 border-canvas-default object-cover"
                        />
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-canvas-default"></div>
                    </div>

                    <h2 className="text-xl font-bold text-fg-default mb-1">{profile.name}</h2>
                    <p className="text-sm text-fg-muted mb-3">{profile.tagline}</p>

                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Available for hire
                    </span>
                </div>

                <p className="text-sm text-fg-default/80 mt-4 text-center">{profile.description}</p>

                <div className="flex flex-col gap-2.5 mt-5 pt-5 border-t border-border-default/50">
                    <div className="flex items-center gap-3 text-sm text-fg-muted">
                        <MapPin size={14} />
                        <span>Indonesia</span>
                    </div>
                    <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-fg-muted hover:text-cyan-400">
                        <Mail size={14} />
                        <span className="truncate">{profile.email}</span>
                    </a>
                    {profile.github && (
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-fg-muted hover:text-cyan-400">
                            <Github size={14} />
                            <span>GitHub</span>
                        </a>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all ${isActive
                                ? 'text-fg-default bg-cyan-500/20 font-medium'
                                : 'text-fg-muted hover:text-fg-default hover:bg-canvas-subtle'
                            }`
                        }
                    >
                        <item.icon size={18} />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
