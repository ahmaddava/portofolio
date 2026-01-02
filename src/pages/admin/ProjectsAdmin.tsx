import { useState } from 'react';
import { useData, type Project } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const ProjectsAdmin = () => {
    const { projects, setProjects } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<Omit<Project, 'id'>>({
        title: '',
        description: '',
        techStack: [],
        imageUrl: '',
        videoUrl: '',
        demoLink: '',
        repoLink: '',
    });
    const [techInput, setTechInput] = useState('');

    const openModal = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                description: project.description,
                techStack: project.techStack,
                imageUrl: project.imageUrl,
                videoUrl: project.videoUrl || '',
                demoLink: project.demoLink,
                repoLink: project.repoLink,
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                description: '',
                techStack: [],
                imageUrl: '',
                videoUrl: '',
                demoLink: '',
                repoLink: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setTechInput('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProject) {
            setProjects(projects.map(p =>
                p.id === editingProject.id ? { ...formData, id: editingProject.id } : p
            ));
        } else {
            const newId = Math.max(...projects.map(p => p.id), 0) + 1;
            setProjects([...projects, { ...formData, id: newId }]);
        }
        closeModal();
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const addTech = () => {
        if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
            setFormData({ ...formData, techStack: [...formData.techStack, techInput.trim()] });
            setTechInput('');
        }
    };

    const removeTech = (tech: string) => {
        setFormData({ ...formData, techStack: formData.techStack.filter(t => t !== tech) });
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Projects</h1>
                    <p className="text-sm sm:text-base text-gray-400">Manage your portfolio projects</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors whitespace-nowrap"
                >
                    <Plus size={20} />
                    <span className="hidden sm:inline">Add Project</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            {/* Projects List */}
            <div className="grid gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 hover:border-gray-700 transition-colors"
                    >
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 w-full">
                            <h3 className="text-base sm:text-lg font-semibold text-white">{project.title}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-1 mt-1">{project.description}</p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                                {project.techStack.slice(0, 3).map((tech) => (
                                    <span key={tech} className="text-xs bg-gray-800 text-cyan-400 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                            <button
                                onClick={() => openModal(project)}
                                className="flex-1 sm:flex-none p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="flex-1 sm:flex-none p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingProject ? 'Edit Project' : 'Add Project'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Tech Stack</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Add technology..."
                                    />
                                    <button
                                        type="button"
                                        onClick={addTech}
                                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.techStack.map((tech) => (
                                        <span key={tech} className="flex items-center gap-1 text-sm bg-gray-800 text-cyan-400 px-3 py-1 rounded-full">
                                            {tech}
                                            <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400">
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Video URL (optional)</label>
                                    <input
                                        type="url"
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Demo Link</label>
                                    <input
                                        type="url"
                                        value={formData.demoLink}
                                        onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Repo Link</label>
                                    <input
                                        type="url"
                                        value={formData.repoLink}
                                        onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                                >
                                    <Save size={18} />
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsAdmin;
