import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Types
export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    videoUrl?: string;
    demoLink: string;
    repoLink: string;
}

export interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface TechItem {
    id: number;
    name: string;
    icon: string;
}

export interface ProfileData {
    name: string;
    role: string;
    tagline: string;
    description: string;
    profileImage: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
}

interface DataContextType {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    experiences: Experience[];
    setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
    techStack: TechItem[];
    setTechStack: React.Dispatch<React.SetStateAction<TechItem[]>>;
    profile: ProfileData;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data
const defaultProjects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "Interactive admin dashboard with real-time charts and data visualization.",
        techStack: ["React", "TypeScript", "Tailwind", "Recharts"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://cdn.coverr.co/videos/coverr-working-on-a-monitor-4241/1080p.mp4",
        demoLink: "#",
        repoLink: "#",
    },
    {
        id: 2,
        title: "Social Media App",
        description: "A full-featured social platform with real-time messaging and notifications.",
        techStack: ["Next.js", "Prisma", "Socket.io"],
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://cdn.coverr.co/videos/coverr-coding-on-laptop-2-4245/1080p.mp4",
        demoLink: "#",
        repoLink: "#",
    },
    {
        id: 3,
        title: "Portfolio Website",
        description: "Modern portfolio with advanced animations and glassmorphism design.",
        techStack: ["React", "Framer Motion", "Tailwind"],
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
        demoLink: "#",
        repoLink: "#",
    },
    {
        id: 4,
        title: "Task Management Tool",
        description: "Kanban-style task manager for teams.",
        techStack: ["Vue.js", "Vuex", "Firebase"],
        imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1000&auto=format&fit=crop",
        demoLink: "#",
        repoLink: "#",
    }
];

const defaultExperiences: Experience[] = [
    {
        id: 1,
        company: "Tech Startups Inc.",
        role: "Senior Frontend Developer",
        period: "2023 - Present",
        description: "Leading the frontend team in building scalable React applications."
    },
    {
        id: 2,
        company: "Digital Agency",
        role: "Fullstack Developer",
        period: "2021 - 2023",
        description: "Developed custom e-commerce solutions using Next.js and Shopify."
    },
    {
        id: 3,
        company: "Freelance",
        role: "Web Developer",
        period: "2020 - 2021",
        description: "Built portfolio websites and landing pages using React and Tailwind."
    }
];

const defaultTechStack: TechItem[] = [
    { id: 1, name: "React", icon: "⚛️" },
    { id: 2, name: "TypeScript", icon: "🔷" },
    { id: 3, name: "Next.js", icon: "▲" },
    { id: 4, name: "Tailwind CSS", icon: "🎨" },
    { id: 5, name: "Node.js", icon: "🟢" },
    { id: 6, name: "PostgreSQL", icon: "🐘" },
    { id: 7, name: "Framer Motion", icon: "🎬" },
    { id: 8, name: "Docker", icon: "🐳" },
    { id: 9, name: "AWS", icon: "☁️" },
    { id: 10, name: "Git", icon: "🔀" },
    { id: 11, name: "Prisma", icon: "💎" },
    { id: 12, name: "Vite", icon: "⚡" },
];

const defaultProfile: ProfileData = {
    name: "Your Name",
    role: "Fullstack Developer",
    tagline: "Building Digital Experiences",
    description: "I'm a Fullstack Developer specializing in building exceptional digital experiences. Currently focused on React, TypeScript, and Modern UI.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    email: "hello@example.com",
    github: "#",
    linkedin: "#",
    twitter: "#",
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('portfolio_projects');
        return saved ? JSON.parse(saved) : defaultProjects;
    });

    const [experiences, setExperiences] = useState<Experience[]>(() => {
        const saved = localStorage.getItem('portfolio_experiences');
        return saved ? JSON.parse(saved) : defaultExperiences;
    });

    const [techStack, setTechStack] = useState<TechItem[]>(() => {
        const saved = localStorage.getItem('portfolio_techstack');
        return saved ? JSON.parse(saved) : defaultTechStack;
    });

    const [profile, setProfile] = useState<ProfileData>(() => {
        const saved = localStorage.getItem('portfolio_profile');
        return saved ? JSON.parse(saved) : defaultProfile;
    });

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('portfolio_experiences', JSON.stringify(experiences));
    }, [experiences]);

    useEffect(() => {
        localStorage.setItem('portfolio_techstack', JSON.stringify(techStack));
    }, [techStack]);

    useEffect(() => {
        localStorage.setItem('portfolio_profile', JSON.stringify(profile));
    }, [profile]);

    return (
        <DataContext.Provider value={{
            projects, setProjects,
            experiences, setExperiences,
            techStack, setTechStack,
            profile, setProfile,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
