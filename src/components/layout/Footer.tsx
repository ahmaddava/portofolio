import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import MagneticButton from '../ui/MagneticButton';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
    const { profile } = useData();
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="py-16 md:py-24 bg-gray-950 border-t border-gray-900">
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Let's Work
                </motion.h2>
                <motion.h2
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-500 mb-8 md:mb-12 tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Together.
                </motion.h2>

                <motion.div
                    className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <MagneticButton href={`mailto:${profile.email}`} className="p-3 md:p-4 rounded-full bg-gray-900 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black transition-all duration-300">
                        <Mail size={20} className="md:w-6 md:h-6" />
                    </MagneticButton>
                    <MagneticButton href={profile.github} className="p-3 md:p-4 rounded-full bg-gray-900 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black transition-all duration-300">
                        <Github size={20} className="md:w-6 md:h-6" />
                    </MagneticButton>
                    <MagneticButton href={profile.linkedin} className="p-3 md:p-4 rounded-full bg-gray-900 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black transition-all duration-300">
                        <Linkedin size={20} className="md:w-6 md:h-6" />
                    </MagneticButton>
                    <MagneticButton href={profile.twitter} className="p-3 md:p-4 rounded-full bg-gray-900 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black transition-all duration-300">
                        <Twitter size={20} className="md:w-6 md:h-6" />
                    </MagneticButton>
                </motion.div>

                <p className="text-gray-600 text-xs md:text-sm">
                    © {currentYear} {profile.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
