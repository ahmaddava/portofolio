import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import SplitText from '../ui/SplitText';

const Hero = () => {
    const { profile, loading } = useData();

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gray-950">
                <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </section>
        );
    }

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-950 px-4">

            {/* Background Grid Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            {/* Glow Effect */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 text-xs md:text-sm font-medium border border-cyan-500/20 mb-6">
                        Available for freelance work
                    </span>
                </motion.div>

                {/* SplitText Animation for Tagline */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
                    <SplitText
                        text={profile.tagline?.split(' ').slice(0, 2).join(' ') || 'Building Digital'}
                        className="justify-center"
                        delay={40}
                    />
                    <SplitText
                        text={profile.tagline?.split(' ').slice(2).join(' ') || 'Experiences'}
                        className="justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                        delay={40}
                    />
                </h1>

                <motion.p
                    className="text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {profile.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity text-center"
                    >
                        View Work
                    </a>
                    <a
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-3 rounded-full border border-gray-700 text-white font-semibold hover:bg-gray-900 transition-colors text-center"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center p-2"
                >
                    <motion.div className="w-1 h-2 bg-gray-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
