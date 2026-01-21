import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Types
export interface Project {
    id: number;
    title: string;
    description: string;
    tech_stack: string[];
    image_url: string;
    video_url?: string;
    demo_link: string;
    repo_link: string;
}

export interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    description: string;
    order_index: number;
}

export interface TechItem {
    id: number;
    name: string;
    icon: string;
    order_index: number;
}

export interface ProfileData {
    id?: number;
    name: string;
    role: string;
    tagline: string;
    description: string;
    profile_image: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
}

interface DataContextType {
    projects: Project[];
    experiences: Experience[];
    techStack: TechItem[];
    profile: ProfileData;
    loading: boolean;
    refreshData: () => Promise<void>;
    // CRUD methods
    addProject: (project: Omit<Project, 'id'>) => Promise<void>;
    updateProject: (id: number, project: Omit<Project, 'id'>) => Promise<void>;
    deleteProject: (id: number) => Promise<void>;
    addExperience: (exp: Omit<Experience, 'id'>) => Promise<void>;
    updateExperience: (id: number, exp: Omit<Experience, 'id'>) => Promise<void>;
    deleteExperience: (id: number) => Promise<void>;
    addTechItem: (item: Omit<TechItem, 'id'>) => Promise<void>;
    updateTechItem: (id: number, item: Omit<TechItem, 'id'>) => Promise<void>;
    deleteTechItem: (id: number) => Promise<void>;
    updateProfile: (profile: ProfileData) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data for initial state - Use real data as fallback
const defaultProfile: ProfileData = {
    name: "Ahmad Dava",
    role: "Fullstack Developer",
    tagline: "Building Digital Experiences",
    description: "I'm a Fullstack Developer specializing in building exceptional digital experiences.",
    profile_image: "https://avatars.githubusercontent.com/u/ahmaddava",
    email: "ahmaddava3@gmail.com",
    github: "https://github.com/ahmaddava",
    linkedin: "#",
    twitter: "#",
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [techStack, setTechStack] = useState<TechItem[]>([]);
    const [profile, setProfile] = useState<ProfileData>(defaultProfile);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch all data in parallel
            const [projectsRes, experiencesRes, techStackRes, profileRes] = await Promise.all([
                supabase.from('projects').select('*').order('id', { ascending: true }),
                supabase.from('experiences').select('*').order('order_index', { ascending: true }),
                supabase.from('techstack').select('*').order('order_index', { ascending: true }),
                supabase.from('profiles').select('*').single(),
            ]);

            if (projectsRes.data) setProjects(projectsRes.data);
            if (experiencesRes.data) setExperiences(experiencesRes.data);
            if (techStackRes.data) setTechStack(techStackRes.data);
            if (profileRes.data) setProfile(profileRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = async () => {
        await fetchData();
    };

    // Projects CRUD
    const addProject = async (project: Omit<Project, 'id'>) => {
        const { error } = await supabase.from('projects').insert([project]);
        if (!error) await refreshData();
    };

    const updateProject = async (id: number, project: Omit<Project, 'id'>) => {
        const { error } = await supabase.from('projects').update(project).eq('id', id);
        if (!error) await refreshData();
    };

    const deleteProject = async (id: number) => {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) await refreshData();
    };

    // Experiences CRUD
    const addExperience = async (exp: Omit<Experience, 'id'>) => {
        const { error } = await supabase.from('experiences').insert([exp]);
        if (!error) await refreshData();
    };

    const updateExperience = async (id: number, exp: Omit<Experience, 'id'>) => {
        const { error } = await supabase.from('experiences').update(exp).eq('id', id);
        if (!error) await refreshData();
    };

    const deleteExperience = async (id: number) => {
        const { error } = await supabase.from('experiences').delete().eq('id', id);
        if (!error) await refreshData();
    };

    // TechStack CRUD
    const addTechItem = async (item: Omit<TechItem, 'id'>) => {
        const { error } = await supabase.from('techstack').insert([item]);
        if (!error) await refreshData();
    };

    const updateTechItem = async (id: number, item: Omit<TechItem, 'id'>) => {
        const { error } = await supabase.from('techstack').update(item).eq('id', id);
        if (!error) await refreshData();
    };

    const deleteTechItem = async (id: number) => {
        const { error } = await supabase.from('techstack').delete().eq('id', id);
        if (!error) await refreshData();
    };

    // Profile update
    const updateProfile = async (newProfile: ProfileData) => {
        if (profile.id) {
            const { error } = await supabase.from('profiles').update(newProfile).eq('id', profile.id);
            if (!error) await refreshData();
        } else {
            const { error } = await supabase.from('profiles').insert([newProfile]);
            if (!error) await refreshData();
        }
    };

    return (
        <DataContext.Provider value={{
            projects,
            experiences,
            techStack,
            profile,
            loading,
            refreshData,
            addProject,
            updateProject,
            deleteProject,
            addExperience,
            updateExperience,
            deleteExperience,
            addTechItem,
            updateTechItem,
            deleteTechItem,
            updateProfile,
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
