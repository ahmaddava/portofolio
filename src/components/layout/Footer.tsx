import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const { profile } = useData();
    const currentYear = new Date().getFullYear();

    // Extract username dari URL
    const getGithubUsername = (url: string) => {
        if (!url || url === '#') return 'GitHub';
        const match = url.match(/github\.com\/([^/]+)/);
        return match ? `@${match[1]}` : 'GitHub';
    };

    const getLinkedinUsername = (url: string) => {
        if (!url || url === '#') return 'LinkedIn';
        const match = url.match(/linkedin\.com\/in\/([^/]+)/);
        return match ? match[1] : 'LinkedIn';
    };

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

                {/* Contact Links with Labels */}
                <motion.div
                    className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Email */}
                    <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:border-transparent transition-all duration-300 group"
                    >
                        <Mail size={20} className="flex-shrink-0" />
                        <span className="text-sm md:text-base font-medium">{profile.email}</span>
                    </a>

                    {/* GitHub */}
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:border-transparent transition-all duration-300 group"
                    >
                        <Github size={20} className="flex-shrink-0" />
                        <span className="text-sm md:text-base font-medium">{getGithubUsername(profile.github)}</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:border-transparent transition-all duration-300 group"
                    >
                        <Linkedin size={20} className="flex-shrink-0" />
                        <span className="text-sm md:text-base font-medium">{getLinkedinUsername(profile.linkedin)}</span>
                    </a>
                </motion.div>

                <p className="text-gray-600 text-xs md:text-sm">
                    © {currentYear} {profile.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
