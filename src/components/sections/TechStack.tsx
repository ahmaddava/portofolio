import { useData } from '../../context/DataContext';
import InfiniteMarquee from '../ui/InfiniteMarquee';

const TechStack = () => {
    const { techStack } = useData();

    const renderIcon = (icon: string) => {
        if (icon.startsWith('http')) {
            return <img src={icon} alt="" className="w-5 h-5 md:w-6 md:h-6 object-contain" />;
        }
        return <span className="text-lg md:text-xl">{icon}</span>;
    };

    return (
        <section id="stack" className="py-16 md:py-24 bg-gray-950 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 md:mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-center text-gray-400">
                    Technologies I use
                </h2>
            </div>

            <InfiniteMarquee speed={40} pauseOnHover>
                <div className="flex gap-4 md:gap-8 px-2 md:px-4">
                    {techStack.map((tech) => (
                        <div
                            key={tech.id}
                            className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 whitespace-nowrap"
                        >
                            {renderIcon(tech.icon)}
                            <span className="text-sm md:text-base">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </InfiniteMarquee>

            {/* Reverse direction row */}
            <div className="mt-4">
                <InfiniteMarquee speed={35} direction="right" pauseOnHover>
                    <div className="flex gap-4 md:gap-8 px-2 md:px-4">
                        {[...techStack].reverse().map((tech) => (
                            <div
                                key={`${tech.id}-rev`}
                                className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 font-medium hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 whitespace-nowrap"
                            >
                                {renderIcon(tech.icon)}
                                <span className="text-sm md:text-base">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </InfiniteMarquee>
            </div>
        </section>
    );
};

export default TechStack;
