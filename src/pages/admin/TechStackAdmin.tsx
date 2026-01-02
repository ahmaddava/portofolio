import { useState } from 'react';
import { useData, type TechItem } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const TechStackAdmin = () => {
    const { techStack, setTechStack } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TechItem | null>(null);
    const [formData, setFormData] = useState<Omit<TechItem, 'id'>>({
        name: '',
        icon: '',
    });

    const openModal = (item?: TechItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({ name: item.name, icon: item.icon });
        } else {
            setEditingItem(null);
            setFormData({ name: '', icon: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            setTechStack(techStack.map(t =>
                t.id === editingItem.id ? { ...formData, id: editingItem.id } : t
            ));
        } else {
            const newId = Math.max(...techStack.map(t => t.id), 0) + 1;
            setTechStack([...techStack, { ...formData, id: newId }]);
        }
        closeModal();
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setTechStack(techStack.filter(t => t.id !== id));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tech Stack</h1>
                    <p className="text-gray-400">Manage your skills and technologies</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                >
                    <Plus size={20} />
                    Add Technology
                </button>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {techStack.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-gray-700 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-white font-medium">{item.name}</span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openModal(item)}
                                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                            >
                                <Pencil size={14} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b border-gray-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingItem ? 'Edit Technology' : 'Add Technology'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="e.g., React"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="e.g., ⚛️"
                                    required
                                />
                                <p className="text-gray-500 text-xs mt-1">Use an emoji or unicode character</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-400 hover:text-white">
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

export default TechStackAdmin;
