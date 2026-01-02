import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const Experience = () => {
    const { experiences, profile } = useData();

    return (
        <section className="py-16 md:py-24 bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Left: Profile Image */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Decorative Box */}
                        <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-2xl transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 -z-10" />
                        <div className="aspect-square max-w-[350px] md:max-w-[400px] mx-auto lg:mx-0 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 bg-gray-900">
                            <img
                                src={profile.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
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
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-5px] md:left-[-6px] top-2 w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

                                    <h3 className="text-lg md:text-xl font-bold text-white">{exp.role}</h3>
                                    <p className="text-cyan-400 text-xs md:text-sm mb-2">{exp.company} • {exp.period}</p>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
