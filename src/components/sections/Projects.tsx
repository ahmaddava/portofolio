import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
    const { projects } = useData();

    return (
        <section id="projects" className="py-16 md:py-24 bg-gray-950">
            <div className="container mx-auto px-4">
                <motion.div
                    className="mb-10 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                        Selected Work
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                        A curated showcase of projects I've built, featuring web applications and interactive experiments.
                    </p>
                </motion.div>

                {/* Bento Grid Layout - Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] sm:auto-rows-[300px] md:auto-rows-[350px] lg:auto-rows-[400px] gap-4 md:gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            // Bento effect: first item large on desktop
                            className={index === 0 ? "sm:col-span-2 sm:row-span-1 lg:row-span-1" : ""}
                        >
                            <ProjectCard
                                project={project}
                                className="h-full"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
