import { useState } from 'react';
import { useData, type TechItem } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';

const TechStackAdmin = () => {
    const { techStack, addTechItem, updateTechItem, deleteTechItem } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TechItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Omit<TechItem, 'id'>>({
        name: '',
        icon: '',
        order_index: 0,
    });

    const openModal = (item?: TechItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({ name: item.name, icon: item.icon, order_index: item.order_index });
        } else {
            setEditingItem(null);
            setFormData({ name: '', icon: '', order_index: techStack.length });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (editingItem) {
            await updateTechItem(editingItem.id, formData);
        } else {
            await addTechItem(formData);
        }

        setLoading(false);
        closeModal();
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            await deleteTechItem(id);
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Tech Stack</h1>
                    <p className="text-sm sm:text-base text-gray-400">Manage your skills and technologies</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors whitespace-nowrap"
                >
                    <Plus size={20} />
                    <span className="hidden sm:inline">Add Technology</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            {/* Tech Stack Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {techStack.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-3 sm:p-4 flex items-center justify-between hover:border-gray-700 transition-colors group"
                    >
                        <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xl sm:text-2xl">{item.icon}</span>
                            <span className="text-sm sm:text-base text-white font-medium">{item.name}</span>
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
                {techStack.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No technologies added yet. Click "Add" to add your first skill.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
                            <h2 className="text-lg sm:text-xl font-bold text-white">
                                {editingItem ? 'Edit Technology' : 'Add Technology'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
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
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    {loading ? 'Saving...' : 'Save'}
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
