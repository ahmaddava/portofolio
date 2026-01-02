import { useData } from '../../context/DataContext';
import { FolderKanban, User, Wrench, Sparkles } from 'lucide-react';

const Dashboard = () => {
    const { projects, experiences, techStack } = useData();

    const stats = [
        { label: 'Projects', value: projects.length, icon: FolderKanban, color: 'cyan' },
        { label: 'Experiences', value: experiences.length, icon: User, color: 'blue' },
        { label: 'Tech Stack', value: techStack.length, icon: Wrench, color: 'purple' },
    ];

    return (
        <div>
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-400">Welcome to your portfolio admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 hover:border-gray-700 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                            <stat.icon className={`text-${stat.color}-400`} size={20} />
                            <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-cyan-400" size={18} />
                    <h2 className="text-lg sm:text-xl font-bold text-white">Quick Tips</h2>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-400">
                    <li>• Use the <strong className="text-white">Projects</strong> section to add, edit, or remove your work samples</li>
                    <li>• Update your <strong className="text-white">Profile</strong> information to personalize your portfolio</li>
                    <li>• Manage your <strong className="text-white">Tech Stack</strong> to showcase your skills</li>
                    <li>• All changes are saved automatically to your browser's local storage</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
