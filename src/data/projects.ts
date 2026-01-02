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

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        description: "Interactive admin dashboard with real-time charts and data visualization.",
        techStack: ["React", "TypeScript", "Tailwind", "Recharts"],
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        videoUrl: "https://cdn.coverr.co/videos/coverr-working-on-a-monitor-4241/1080p.mp4", // Placeholder video
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
