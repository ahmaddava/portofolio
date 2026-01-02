import { useState, useRef } from 'react';
import { useData, type TechItem } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save, Upload, Image, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const TechStackAdmin = () => {
    const { techStack, addTechItem, updateTechItem, deleteTechItem } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TechItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<Omit<TechItem, 'id'>>({
        name: '',
        icon: '',
        order_index: 0,
    });
    const [iconType, setIconType] = useState<'emoji' | 'image'>('emoji');

    const openModal = (item?: TechItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({ name: item.name, icon: item.icon, order_index: item.order_index });
            // Detect if icon is URL or emoji
            setIconType(item.icon.startsWith('http') ? 'image' : 'emoji');
        } else {
            setEditingItem(null);
            setFormData({ name: '', icon: '', order_index: techStack.length });
            setIconType('emoji');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `tech-${Date.now()}.${fileExt}`;
            const filePath = `techstack/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setFormData({ ...formData, icon: data.publicUrl });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Make sure you have created an "images" bucket in Supabase Storage.');
        }
        setUploading(false);
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

    const renderIcon = (icon: string) => {
        if (icon.startsWith('http')) {
            return <img src={icon} alt="" className="w-8 h-8 object-contain" />;
        }
        return <span className="text-2xl">{icon}</span>;
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
                            {renderIcon(item.icon)}
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

                            {/* Icon Type Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Icon Type</label>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIconType('emoji');
                                            setFormData({ ...formData, icon: '' });
                                        }}
                                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${iconType === 'emoji'
                                                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                                : 'border-gray-700 text-gray-400 hover:border-gray-600'
                                            }`}
                                    >
                                        Emoji
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIconType('image');
                                            setFormData({ ...formData, icon: '' });
                                        }}
                                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${iconType === 'image'
                                                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                                : 'border-gray-700 text-gray-400 hover:border-gray-600'
                                            }`}
                                    >
                                        Logo Image
                                    </button>
                                </div>
                            </div>

                            {/* Emoji Input */}
                            {iconType === 'emoji' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Emoji Icon</label>
                                    <input
                                        type="text"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-2xl text-center"
                                        placeholder="⚛️"
                                        required
                                    />
                                    <p className="text-gray-500 text-xs mt-1">Paste an emoji character</p>
                                </div>
                            )}

                            {/* Image Upload */}
                            {iconType === 'image' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Logo Image</label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />

                                    {formData.icon ? (
                                        <div className="relative group">
                                            <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
                                                <img
                                                    src={formData.icon}
                                                    alt="Logo preview"
                                                    className="max-w-24 max-h-24 object-contain"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                                            >
                                                <span className="text-white flex items-center gap-2 text-sm">
                                                    <Upload size={18} /> Change Logo
                                                </span>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                                        >
                                            {uploading ? (
                                                <Loader2 className="animate-spin" size={24} />
                                            ) : (
                                                <>
                                                    <Image size={28} />
                                                    <span className="text-sm">Click to upload logo</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                    <p className="text-gray-500 text-xs mt-2">Recommended: PNG with transparent background, 64x64 or larger</p>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-400 hover:text-white">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !formData.icon}
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
