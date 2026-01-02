import { useState } from 'react';
import { useData, type Experience } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const ProfileAdmin = () => {
    const { profile, setProfile, experiences, setExperiences } = useData();
    const [isExpModalOpen, setIsExpModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState<Experience | null>(null);
    const [expFormData, setExpFormData] = useState<Omit<Experience, 'id'>>({
        company: '',
        role: '',
        period: '',
        description: '',
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const openExpModal = (exp?: Experience) => {
        if (exp) {
            setEditingExp(exp);
            setExpFormData({
                company: exp.company,
                role: exp.role,
                period: exp.period,
                description: exp.description,
            });
        } else {
            setEditingExp(null);
            setExpFormData({ company: '', role: '', period: '', description: '' });
        }
        setIsExpModalOpen(true);
    };

    const closeExpModal = () => {
        setIsExpModalOpen(false);
        setEditingExp(null);
    };

    const handleExpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingExp) {
            setExperiences(experiences.map(exp =>
                exp.id === editingExp.id ? { ...expFormData, id: editingExp.id } : exp
            ));
        } else {
            const newId = Math.max(...experiences.map(exp => exp.id), 0) + 1;
            setExperiences([...experiences, { ...expFormData, id: newId }]);
        }
        closeExpModal();
    };

    const handleExpDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            setExperiences(experiences.filter(exp => exp.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Profile & Experience</h1>
                <p className="text-gray-400">Manage your personal information</p>
            </div>

            {/* Profile Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={profile.role}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                        <input
                            type="text"
                            name="tagline"
                            value={profile.tagline}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={profile.description}
                            onChange={handleProfileChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image URL</label>
                        <input
                            type="url"
                            name="profileImage"
                            value={profile.profileImage}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                        <input
                            type="url"
                            name="github"
                            value={profile.github}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={profile.linkedin}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Experience</h2>
                    <button
                        onClick={() => openExpModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                        <Plus size={18} />
                        Add
                    </button>
                </div>

                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-gray-800 rounded-lg p-4 flex items-start justify-between"
                        >
                            <div>
                                <h3 className="font-semibold text-white">{exp.role}</h3>
                                <p className="text-cyan-400 text-sm">{exp.company} • {exp.period}</p>
                                <p className="text-gray-400 text-sm mt-1">{exp.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openExpModal(exp)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleExpDelete(exp.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Modal */}
            {isExpModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingExp ? 'Edit Experience' : 'Add Experience'}
                            </h2>
                            <button onClick={closeExpModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleExpSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                                <input
                                    type="text"
                                    value={expFormData.role}
                                    onChange={(e) => setExpFormData({ ...expFormData, role: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                <input
                                    type="text"
                                    value={expFormData.company}
                                    onChange={(e) => setExpFormData({ ...expFormData, company: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Period</label>
                                <input
                                    type="text"
                                    value={expFormData.period}
                                    onChange={(e) => setExpFormData({ ...expFormData, period: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="e.g., 2021 - 2023"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    value={expFormData.description}
                                    onChange={(e) => setExpFormData({ ...expFormData, description: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeExpModal} className="px-4 py-2 text-gray-400 hover:text-white">
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

export default ProfileAdmin;
