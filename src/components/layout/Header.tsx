import { Github, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import { useData } from '../../context/DataContext';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const { profile } = useData();

    return (
        <header className="bg-canvas-subtle border-b border-border-default py-4">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-1 text-fg-muted hover:text-fg-default"
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="flex items-center gap-3">
                        <div className="p-1 bg-canvas-default rounded-full border border-border-default">
                            <Github className="w-8 h-8 text-fg-default" />
                        </div>
                        <span className="font-semibold text-lg text-fg-default hidden md:block">
                            {profile.name || 'Ahmad Dava'}
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {/* Placeholder for Profile Dropdown or other actions */}
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                        <img
                            src={profile.profile_image}
                            alt="Profile"
                            className="w-8 h-8 rounded-full border border-border-default"
                        />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
