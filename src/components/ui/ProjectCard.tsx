import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../context/DataContext';
import { Github, ExternalLink } from 'lucide-react';
import TiltCard from './TiltCard';

interface Props {
    project: Project;
    className?: string;
}

const ProjectCard: React.FC<Props> = ({ project, className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch((err) => console.log("Video play failed", err));
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <TiltCard
            className={`relative rounded-2xl md:rounded-3xl overflow-hidden border border-gray-800 bg-gray-900/50 group ${className}`}
            rotationStrength={8}
        >
            <motion.div
                className="h-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Media Container */}
                <div className="relative h-48 sm:h-56 md:h-64 w-full bg-gray-900 overflow-hidden">
                    {/* Static Image */}
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isHovered && project.video_url ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                    />

                    {/* Video (Shows on hover) */}
                    {project.video_url && (
                        <video
                            ref={videoRef}
                            src={project.video_url}
                            muted
                            loop
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        />
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                        {project.title}
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm mb-3 md:mb-4 line-clamp-2 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                        {project.tech_stack?.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-[10px] md:text-xs font-medium bg-gray-800/80 backdrop-blur-sm text-cyan-300 px-2 py-1 rounded">
                                {tech}
                            </span>
                        ))}
                        {project.tech_stack && project.tech_stack.length > 3 && (
                            <span className="text-[10px] md:text-xs font-medium bg-gray-800/80 backdrop-blur-sm text-gray-400 px-2 py-1 rounded">
                                +{project.tech_stack.length - 3}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3 md:gap-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        <a href={project.demo_link} className="flex items-center gap-1 text-xs md:text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                            <ExternalLink size={14} /> <span className="hidden sm:inline">Live</span> Demo
                        </a>
                        <a href={project.repo_link} className="flex items-center gap-1 text-xs md:text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                            <Github size={14} /> Source
                        </a>
                    </div>
                </div>
            </motion.div>
        </TiltCard>
    );
};

export default ProjectCard;
