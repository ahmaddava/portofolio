import { useData } from '../../context/DataContext';
import SectionCard from '../ui/SectionCard';
import { Briefcase } from 'lucide-react';

const ExperienceCard = () => {
    const { experiences } = useData();

    return (
        <SectionCard title="Experience">
            <div className="relative border-l border-border-muted ml-3 space-y-6">
                {experiences.map((exp) => (
                    <div key={exp.id} className="ml-6 relative">
                        {/* Dot indicator */}
                        <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-border-muted ring-4 ring-canvas-default" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h4 className="font-semibold text-fg-default">{exp.role}</h4>
                            <span className="text-xs text-fg-muted font-mono bg-canvas-subtle px-2 py-0.5 rounded-full border border-border-muted">
                                {exp.period}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-fg-muted mb-2">
                            <Briefcase size={14} />
                            <span>{exp.company}</span>
                        </div>
                        <p className="text-sm text-fg-default leading-relaxed">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
            {/* Download Resume Button Generic */}
            <div className="mt-6 pt-4 border-t border-border-muted">
                <button className="w-full py-2 text-sm font-medium text-fg-default bg-canvas-subtle border border-border-default rounded-md hover:bg-canvas-default transition-colors">
                    Download Resume
                </button>
            </div>
        </SectionCard>
    );
};

export default ExperienceCard;
