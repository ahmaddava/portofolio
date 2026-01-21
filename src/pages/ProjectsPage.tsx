import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';

const ProjectsPage = () => {
    const { projects } = useData();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h1 className="text-3xl font-bold text-fg-default flex items-center gap-3 mb-2">
                    <FolderGit2 className="text-cyan-400" />
                    Projects
                </h1>
                <p className="text-fg-muted">Showcase of my web applications and experiments.</p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="rounded-2xl bg-gradient-to-br from-canvas-subtle/80 to-canvas-default/50 backdrop-blur-sm border border-border-default/50 p-6 shadow-xl relative overflow-hidden group"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        {/* Decorative gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <FolderGit2 size={18} className="text-cyan-400" />
                                    <h3 className="font-semibold text-lg text-fg-default group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full border border-border-default text-fg-muted bg-canvas-subtle">
                                    Public
                                </span>
                            </div>

                            <p className="text-sm text-fg-muted mb-4 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech_stack.slice(0, 4).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs px-2 py-1 rounded-full bg-canvas-subtle border border-border-default text-fg-muted"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-4 border-t border-border-default/50">
                                {project.repo_link && (
                                    <motion.a
                                        href={project.repo_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-fg-muted hover:text-cyan-400 transition-colors"
                                        whileHover={{ x: 3 }}
                                    >
                                        <Github size={16} />
                                        <span>Repository</span>
                                    </motion.a>
                                )}
                                {project.demo_link && (
                                    <motion.a
                                        href={project.demo_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-fg-muted hover:text-cyan-400 transition-colors"
                                        whileHover={{ x: 3 }}
                                    >
                                        <ExternalLink size={16} />
                                        <span>Live Demo</span>
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default ProjectsPage;
