import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const ExperiencePage = () => {
    const { experiences } = useData();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            className="max-w-4xl"
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
                    <Briefcase className="text-cyan-400" />
                    Experience
                </h1>
                <p className="text-fg-muted">My professional career and work history.</p>
            </motion.div>

            <motion.div
                className="rounded-2xl bg-gradient-to-br from-canvas-subtle/80 to-canvas-default/50 backdrop-blur-sm border border-border-default/50 p-6 shadow-xl relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {/* Decorative gradient orb */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

                <motion.div
                    className="relative border-l-2 border-border-default ml-4 space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {experiences.map((exp) => (
                        <motion.div
                            key={exp.id}
                            className="ml-8 relative group"
                            variants={itemVariants}
                        >
                            {/* Timeline dot with glow */}
                            <motion.div
                                className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ring-4 ring-canvas-default shadow-lg shadow-cyan-500/20"
                                whileHover={{ scale: 1.3 }}
                            />

                            <motion.div
                                className="p-4 rounded-xl bg-canvas-default/50 border border-transparent hover:border-border-default/50 hover:bg-canvas-subtle/50 transition-all duration-300"
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-fg-default group-hover:text-cyan-400 transition-colors">
                                        {exp.role}
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted font-mono bg-canvas-subtle px-3 py-1 rounded-full border border-border-default">
                                        <Calendar size={12} />
                                        {exp.period}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-fg-muted mb-3">
                                    <MapPin size={14} className="text-cyan-400" />
                                    <span className="font-medium">{exp.company}</span>
                                </div>

                                <p className="text-sm text-fg-default/80 leading-relaxed">
                                    {exp.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ExperiencePage;
