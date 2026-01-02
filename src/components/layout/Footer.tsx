import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const { profile } = useData();
    const currentYear = new Date().getFullYear();

    const emailLink = `mailto:${profile.email}?subject=Hello%20from%20Portfolio&body=Hi%20${profile.name},%0A%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.`;

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

                {/* Social Icons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {/* Email - Direct anchor tag */}
                    <a
                        href={emailLink}
                        className="p-3 md:p-4 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:border-transparent transition-all duration-300 cursor-pointer"
                    >
                        <Mail size={20} className="md:w-6 md:h-6" />
                    </a>

                    {/* GitHub */}
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 md:p-4 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:border-transparent transition-all duration-300 cursor-pointer"
                    >
                        <Github size={20} className="md:w-6 md:h-6" />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 md:p-4 rounded-full bg-gray-900 border border-gray-800 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-black hover:border-transparent transition-all duration-300 cursor-pointer"
                    >
                        <Linkedin size={20} className="md:w-6 md:h-6" />
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
