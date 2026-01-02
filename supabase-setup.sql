-- Run this SQL in your Supabase SQL Editor:
-- Go to Supabase Dashboard > SQL Editor > New Query

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Your Name',
  role TEXT NOT NULL DEFAULT 'Fullstack Developer',
  tagline TEXT NOT NULL DEFAULT 'Building Digital Experiences',
  description TEXT,
  profile_image TEXT,
  email TEXT,
  github TEXT,
  linkedin TEXT,
  twitter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  image_url TEXT,
  video_url TEXT,
  demo_link TEXT,
  repo_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create techstack table
CREATE TABLE IF NOT EXISTS techstack (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE techstack ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON techstack FOR SELECT USING (true);

-- Create policies for authenticated users to modify data
CREATE POLICY "Allow authenticated insert" ON profiles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON profiles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON profiles FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON experiences FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON experiences FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON techstack FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON techstack FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON techstack FOR DELETE TO authenticated USING (true);

-- ============================================
-- INSERT DUMMY DATA
-- ============================================

-- Insert default profile
INSERT INTO profiles (name, role, tagline, description, profile_image, email, github, linkedin, twitter)
VALUES (
  'Ahmad Dava',
  'Fullstack Developer',
  'Building Digital Experiences',
  'I''m a Fullstack Developer specializing in building exceptional digital experiences. Currently focused on React, TypeScript, and Modern UI.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  'hello@example.com',
  'https://github.com',
  'https://linkedin.com',
  'https://twitter.com'
);

-- Insert sample projects
INSERT INTO projects (title, description, tech_stack, image_url, video_url, demo_link, repo_link) VALUES
(
  'E-Commerce Dashboard',
  'Interactive admin dashboard with real-time charts and data visualization for managing e-commerce operations.',
  ARRAY['React', 'TypeScript', 'Tailwind', 'Recharts'],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  'https://cdn.coverr.co/videos/coverr-working-on-a-monitor-4241/1080p.mp4',
  '#',
  '#'
),
(
  'Social Media App',
  'A full-featured social platform with real-time messaging, notifications, and user interactions.',
  ARRAY['Next.js', 'Prisma', 'Socket.io', 'PostgreSQL'],
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
  'https://cdn.coverr.co/videos/coverr-coding-on-laptop-2-4245/1080p.mp4',
  '#',
  '#'
),
(
  'Portfolio Website',
  'Modern portfolio with advanced animations, glassmorphism design, and interactive elements.',
  ARRAY['React', 'Framer Motion', 'Tailwind CSS'],
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
  NULL,
  '#',
  '#'
),
(
  'Task Management Tool',
  'Kanban-style task manager for teams with drag-and-drop functionality and real-time collaboration.',
  ARRAY['Vue.js', 'Vuex', 'Firebase'],
  'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1000&auto=format&fit=crop',
  NULL,
  '#',
  '#'
);

-- Insert sample experiences
INSERT INTO experiences (company, role, period, description, order_index) VALUES
(
  'Tech Startups Inc.',
  'Senior Frontend Developer',
  '2023 - Present',
  'Leading the frontend team in building scalable React applications with modern best practices.',
  1
),
(
  'Digital Agency',
  'Fullstack Developer',
  '2021 - 2023',
  'Developed custom e-commerce solutions using Next.js, Shopify, and various payment integrations.',
  2
),
(
  'Freelance',
  'Web Developer',
  '2020 - 2021',
  'Built portfolio websites and landing pages for clients using React, Tailwind CSS, and modern tools.',
  3
);

-- Insert sample tech stack
INSERT INTO techstack (name, icon, order_index) VALUES
('React', '⚛️', 1),
('TypeScript', '🔷', 2),
('Next.js', '▲', 3),
('Tailwind CSS', '🎨', 4),
('Node.js', '🟢', 5),
('PostgreSQL', '🐘', 6),
('Framer Motion', '🎬', 7),
('Docker', '🐳', 8),
('AWS', '☁️', 9),
('Git', '🔀', 10),
('Prisma', '💎', 11),
('Vite', '⚡', 12);

-- ============================================
-- STORAGE SETUP (Run this AFTER creating bucket in Dashboard)
-- ============================================
-- IMPORTANT: First create bucket manually in Supabase Dashboard:
-- 1. Go to Storage > New Bucket
-- 2. Name: "images", check "Public bucket"
-- 3. Then run the policies below:

-- Allow public to view images
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images  
CREATE POLICY "Authenticated Upload" ON storage.objects 
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update their images
CREATE POLICY "Authenticated Update" ON storage.objects 
FOR UPDATE TO authenticated USING (bucket_id = 'images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated Delete" ON storage.objects 
FOR DELETE TO authenticated USING (bucket_id = 'images');
