import { useEffect, useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionData {
    total: { lastYear: number };
    contributions: ContributionDay[];
}

const ContributionGraph = () => {
    const { profile } = useData();
    const { theme } = useTheme();
    const username = profile.github?.split('/').pop() || 'ahmaddava';
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [activityType, setActivityType] = useState('all');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Generate mock data as fallback
    const generateMockData = (): ContributionData => {
        const contributions: ContributionDay[] = [];
        const today = new Date();
        let total = 0;

        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);

            const random = Math.random();
            let count = 0;
            let level = 0;

            if (random > 0.3) {
                count = Math.floor(Math.random() * 15) + 1;
                if (count <= 3) level = 1;
                else if (count <= 6) level = 2;
                else if (count <= 10) level = 3;
                else level = 4;
            }

            total += count;
            contributions.push({
                date: date.toISOString().split('T')[0],
                count,
                level
            });
        }

        return { total: { lastYear: total }, contributions };
    };

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
                if (response.ok) {
                    const result = await response.json();
                    if (result.contributions && result.contributions.length > 0) {
                        setData(result);
                    } else {
                        // Fallback to mock data if API returns empty
                        setData(generateMockData());
                    }
                } else {
                    // Fallback to mock data on error
                    setData(generateMockData());
                }
            } catch (error) {
                console.error('Error fetching contributions:', error);
                // Fallback to mock data on error
                setData(generateMockData());
            }
            setLoading(false);
        };

        fetchContributions();
    }, [username]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSettings(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getColorClass = (level: number) => {
        if (theme === 'dark') {
            const colors = [
                'bg-[#161b22]',
                'bg-[#0e4429]',
                'bg-[#006d32]',
                'bg-[#26a641]',
                'bg-[#39d353]',
            ];
            return colors[level] || colors[0];
        } else {
            const colors = [
                'bg-[#ebedf0]',
                'bg-[#9be9a8]',
                'bg-[#40c463]',
                'bg-[#30a14e]',
                'bg-[#216e39]',
            ];
            return colors[level] || colors[0];
        }
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

    const getWeeks = () => {
        if (!data?.contributions) return [];

        const weeks: ContributionDay[][] = [];
        let currentWeek: ContributionDay[] = [];

        data.contributions.forEach((day, index) => {
            const dayOfWeek = new Date(day.date).getDay();

            if (index === 0) {
                for (let i = 0; i < dayOfWeek; i++) {
                    currentWeek.push({ date: '', count: 0, level: 0 });
                }
            }

            currentWeek.push(day);

            if (dayOfWeek === 6 || index === data.contributions.length - 1) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

        return weeks;
    };

    const weeks = getWeeks();

    const settingsOptions = [
        { id: 'all', label: 'All activity', description: 'Shows all contributions' },
        { id: 'commits', label: 'Commits', description: 'Shows only commits' },
        { id: 'issues', label: 'Issues', description: 'Shows issues created' },
        { id: 'prs', label: 'Pull requests', description: 'Shows PRs opened' },
        { id: 'reviews', label: 'Code review', description: 'Shows code reviews' },
    ];

    if (loading) {
        return (
            <div className="rounded-lg border border-border-default bg-canvas-default p-4">
                <div className="animate-pulse h-32 bg-canvas-subtle rounded"></div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-border-default bg-canvas-default p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-fg-default">
                    <span className="font-semibold">{data?.total?.lastYear?.toLocaleString() || 0}</span>
                    {' '}contributions in the last year
                </h3>

                {/* Contribution Settings Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="text-xs text-fg-muted hover:text-fg-default flex items-center gap-1 px-2 py-1 rounded hover:bg-canvas-subtle transition-colors"
                    >
                        Contribution settings
                        <ChevronDown size={12} className={`transition-transform ${showSettings ? 'rotate-180' : ''}`} />
                    </button>

                    {showSettings && (
                        <div className="absolute right-0 top-full mt-1 w-64 bg-canvas-overlay border border-border-default rounded-lg shadow-xl z-50 overflow-hidden">
                            <div className="p-2 border-b border-border-default">
                                <span className="text-xs text-fg-muted">Activity type</span>
                            </div>
                            {settingsOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        setActivityType(option.id);
                                        setShowSettings(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-canvas-subtle flex items-center justify-between ${activityType === option.id ? 'text-fg-default' : 'text-fg-muted'
                                        }`}
                                >
                                    <div>
                                        <div className="font-medium">{option.label}</div>
                                        <div className="text-xs text-fg-muted">{option.description}</div>
                                    </div>
                                    {activityType === option.id && (
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Graph Container */}
            <div className="border border-border-default rounded-md p-3 bg-canvas-default">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-max">
                        {/* Month labels */}
                        <div className="flex text-xs text-fg-muted mb-1 ml-8">
                            {months.map((month, i) => (
                                <span key={i} className="w-[52px]">{month}</span>
                            ))}
                        </div>

                        <div className="flex">
                            {/* Day labels */}
                            <div className="flex flex-col text-xs text-fg-muted pr-2 justify-around h-[88px]">
                                <span className="h-[10px]"></span>
                                <span className="h-[10px]">Mon</span>
                                <span className="h-[10px]"></span>
                                <span className="h-[10px]">Wed</span>
                                <span className="h-[10px]"></span>
                                <span className="h-[10px]">Fri</span>
                                <span className="h-[10px]"></span>
                            </div>

                            {/* Contribution grid */}
                            <div className="flex gap-[3px]">
                                {weeks.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                                        {week.map((day, dayIndex) => (
                                            <div
                                                key={`${weekIndex}-${dayIndex}`}
                                                className={`w-[10px] h-[10px] rounded-sm ${day.date ? getColorClass(day.level) : 'bg-transparent'} hover:ring-1 hover:ring-fg-muted transition-all cursor-pointer`}
                                                title={day.date ? `${day.count} contributions on ${day.date}` : ''}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-2 text-xs text-fg-muted">
                            <a
                                href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-fg-accent"
                            >
                                Learn how we count contributions
                            </a>

                            {/* Legend */}
                            <div className="flex items-center gap-1">
                                <span>Less</span>
                                <div className="flex gap-[2px]">
                                    {[0, 1, 2, 3, 4].map((level) => (
                                        <div key={level} className={`w-[10px] h-[10px] rounded-sm ${getColorClass(level)}`} />
                                    ))}
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContributionGraph;
