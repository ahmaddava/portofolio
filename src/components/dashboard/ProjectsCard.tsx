import { useData } from '../../context/DataContext';
import { FolderGit2, ExternalLink } from 'lucide-react';

const ProjectsCard = () => {
    const { projects } = useData();

    return (
        <div className="rounded-2xl bg-canvas-subtle border border-border-default p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-fg-default flex items-center gap-2">
                    <FolderGit2 className="text-cyan-400" size={20} />
                    Pinned Projects
                </h3>
                <a href="/projects" className="text-xs text-fg-muted hover:text-cyan-400 transition-colors">
                    View all →
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.slice(0, 4).map((project) => (
                    <div
                        key={project.id}
                        className="p-4 rounded-xl border border-border-default bg-canvas-default hover:border-cyan-400/30 transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FolderGit2 size={16} className="text-cyan-400" />
                                <span className="font-semibold text-sm text-cyan-400 group-hover:underline">
                                    {project.title}
                                </span>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full border border-border-default text-fg-muted">
                                Public
                            </span>
                        </div>

                        <p className="text-xs text-fg-muted mb-3 line-clamp-2 min-h-[2.5em]">
                            {project.description}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-fg-muted">
                            {project.tech_stack[0] && (
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                                    <span>{project.tech_stack[0]}</span>
                                </div>
                            )}
                            {project.demo_link && (
                                <a
                                    href={project.demo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 hover:text-cyan-400 transition-colors ml-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={12} />
                                    Demo
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsCard;
