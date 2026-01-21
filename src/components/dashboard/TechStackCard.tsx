import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Layers } from 'lucide-react';

const TechStackCard = () => {
    const { techStack } = useData();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <motion.div
            className="rounded-2xl bg-gradient-to-br from-canvas-subtle/80 to-canvas-default/50 backdrop-blur-sm border border-border-default/50 p-6 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Decorative gradient orb */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-lg font-semibold text-fg-default mb-6 flex items-center gap-2 relative">
                <Layers className="text-cyan-400" size={20} />
                Technologies & Tools
            </h3>

            <motion.div
                className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.id}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-canvas-subtle/80 transition-all duration-300 group cursor-pointer"
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, y: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <motion.div
                            className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-canvas-subtle to-canvas-default rounded-xl border border-border-default/50 group-hover:border-cyan-500/30 group-hover:shadow-lg group-hover:shadow-cyan-500/10 transition-all duration-300"
                            whileHover={{ rotate: 5 }}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-7 h-7 object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </motion.div>
                        <span className="text-xs text-center text-fg-muted group-hover:text-fg-default transition-colors font-medium">
                            {tech.name}
                        </span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default TechStackCard;
