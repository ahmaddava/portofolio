import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const Experience = () => {
    const { experiences, profile, loading } = useData();

    if (loading) {
        return (
            <section className="py-24 bg-gray-950 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-gray-950 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Left: Profile Image with Creative Design */}
                    <motion.div
                        className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Decorative Elements */}
                        <div className="relative">
                            {/* Gradient Glow Background */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-[2rem] blur-2xl" />

                            {/* Animated Border */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl opacity-75 blur-sm animate-pulse" />

                            {/* Main Image Container */}
                            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 rounded-2xl">
                                {/* Inner Border Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl" />

                                {/* Image */}
                                <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[350px] md:h-[430px] rounded-xl overflow-hidden">
                                    {/* Gradient Background for Transparent Images */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950" />

                                    <img
                                        src={profile.profile_image}
                                        alt={profile.name}
                                        className="relative w-full h-full object-cover object-top"
                                    />

                                    {/* Bottom Gradient Fade */}
                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
                                </div>
                            </div>

                            {/* Floating Decorative Elements */}
                            <motion.div
                                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full blur-sm opacity-60"
                                animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full blur-sm opacity-60"
                                animate={{ y: [0, 10, 0], scale: [1, 1.15, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-sm opacity-50"
                                animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                        </div>
                    </motion.div>

                    {/* Right: Experience Timeline */}
                    <div className="order-1 lg:order-2">
                        <motion.h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Experience
                        </motion.h2>
                        <div className="border-l-2 border-gray-800 ml-2 md:ml-3 space-y-8 md:space-y-12">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={exp.id}
                                    className="relative pl-8 md:pl-12"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.15, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Timeline Dot with Glow */}
                                    <div className="absolute left-[-6px] md:left-[-7px] top-2">
                                        <div className="w-3 md:w-3.5 h-3 md:h-3.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
                                        <div className="absolute inset-0 w-3 md:w-3.5 h-3 md:h-3.5 rounded-full bg-cyan-400 animate-ping opacity-30" />
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-white">{exp.role}</h3>
                                    <p className="text-cyan-400 text-xs md:text-sm mb-2">{exp.company} • {exp.period}</p>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{exp.description}</p>
                                </motion.div>
                            ))}
                            {experiences.length === 0 && (
                                <p className="text-gray-500 pl-8">No experience added yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
