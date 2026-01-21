import { motion } from 'framer-motion';
import TechStackCard from '../components/dashboard/TechStackCard';
import { Layers } from 'lucide-react';

const TechStackPage = () => {
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
                    <Layers className="text-cyan-400" />
                    Tech Stack
                </h1>
                <p className="text-fg-muted">Languages, frameworks, and tools I use to build amazing products.</p>
            </motion.div>

            <TechStackCard />
        </motion.div>
    );
};

export default TechStackPage;
