import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-neutral-emphasis/20 transition-colors"
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-fg-default" />
            ) : (
                <Sun size={20} className="text-fg-default" />
            )}
        </button>
    );
};

export default ThemeToggle;
