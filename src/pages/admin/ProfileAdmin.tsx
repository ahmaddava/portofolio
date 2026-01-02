import { useState, useRef } from 'react';
import { useData, type Experience } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Save, Upload, Image, Wand2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ProfileAdmin = () => {
    const { profile, updateProfile, experiences, addExperience, updateExperience, deleteExperience } = useData();
    const [isExpModalOpen, setIsExpModalOpen] = useState(false);
    const [editingExp, setEditingExp] = useState<Experience | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [removingBg, setRemovingBg] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileForm, setProfileForm] = useState(profile);
    const [expFormData, setExpFormData] = useState<Omit<Experience, 'id'>>({
        company: '',
        role: '',
        period: '',
        description: '',
        order_index: 0,
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `profile-${Date.now()}.${fileExt}`;
            const filePath = `profile/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setProfileForm({ ...profileForm, profile_image: data.publicUrl });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Make sure you have created a "images" bucket in Supabase Storage with public access.');
        }
        setUploading(false);
    };

    const handleRemoveBackground = async () => {
        if (!profileForm.profile_image) return;

        setRemovingBg(true);
        try {
            // Using remove.bg API
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': import.meta.env.VITE_REMOVEBG_API_KEY || '',
                },
                body: (() => {
                    const formData = new FormData();
                    formData.append('image_url', profileForm.profile_image);
                    formData.append('size', 'auto');
                    return formData;
                })(),
            });

            if (!response.ok) {
                throw new Error('Failed to remove background');
            }

            const blob = await response.blob();
            const file = new File([blob], `profile-nobg-${Date.now()}.png`, { type: 'image/png' });

            // Upload the processed image to Supabase
            const filePath = `profile/profile-nobg-${Date.now()}.png`;
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setProfileForm({ ...profileForm, profile_image: data.publicUrl });

            alert('Background removed successfully!');
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Error removing background. Make sure you have set VITE_REMOVEBG_API_KEY in your .env file. Get a free API key from https://www.remove.bg/api');
        }
        setRemovingBg(false);
    };

    const handleProfileSave = async () => {
        setLoading(true);
        await updateProfile(profileForm);
        setLoading(false);
    };

    const openExpModal = (exp?: Experience) => {
        if (exp) {
            setEditingExp(exp);
            setExpFormData({
                company: exp.company,
                role: exp.role,
                period: exp.period,
                description: exp.description,
                order_index: exp.order_index,
            });
        } else {
            setEditingExp(null);
            setExpFormData({ company: '', role: '', period: '', description: '', order_index: experiences.length });
        }
        setIsExpModalOpen(true);
    };

    const closeExpModal = () => {
        setIsExpModalOpen(false);
        setEditingExp(null);
    };

    const handleExpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (editingExp) {
            await updateExperience(editingExp.id, expFormData);
        } else {
            await addExperience(expFormData);
        }

        setLoading(false);
        closeExpModal();
    };

    const handleExpDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            await deleteExperience(id);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Profile & Experience</h1>
                <p className="text-sm sm:text-base text-gray-400">Manage your personal information</p>
            </div>

            {/* Profile Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Profile Information</h2>

                {/* Profile Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {profileForm.profile_image ? (
                            <div className="relative group">
                                <img
                                    src={profileForm.profile_image}
                                    alt="Profile"
                                    className="w-28 h-28 rounded-full object-cover border-2 border-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                                >
                                    <Upload size={24} className="text-white" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="w-28 h-28 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                            >
                                {uploading ? <Loader2 className="animate-spin" /> : <Image size={28} />}
                            </button>
                        )}

                        <div className="space-y-2">
                            <div className="text-sm text-gray-400">
                                <p>Click image to upload a new photo</p>
                                <p className="text-xs">JPG, PNG up to 5MB</p>
                            </div>

                            {profileForm.profile_image && (
                                <button
                                    type="button"
                                    onClick={handleRemoveBackground}
                                    disabled={removingBg}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors text-sm"
                                >
                                    {removingBg ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Removing...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 size={16} />
                                            Remove Background
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={profileForm.role}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                        <input
                            type="text"
                            name="tagline"
                            value={profileForm.tagline}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={profileForm.description}
                            onChange={handleProfileChange}
                            rows={3}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                        <input
                            type="url"
                            name="github"
                            value={profileForm.github}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={profileForm.linkedin}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleProfileSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-white">Experience</h2>
                    <button
                        onClick={() => openExpModal()}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                        <Plus size={18} />
                        <span className="hidden sm:inline">Add</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row items-start justify-between gap-3"
                        >
                            <div>
                                <h3 className="font-semibold text-white">{exp.role}</h3>
                                <p className="text-cyan-400 text-sm">{exp.company} • {exp.period}</p>
                                <p className="text-gray-400 text-sm mt-1">{exp.description}</p>
                            </div>
                            <div className="flex gap-2 self-end sm:self-start">
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
                    {experiences.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No experience added yet.
                        </div>
                    )}
                </div>
            </div>

            {/* Experience Modal */}
            {isExpModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
                            <h2 className="text-lg sm:text-xl font-bold text-white">
                                {editingExp ? 'Edit Experience' : 'Add Experience'}
                            </h2>
                            <button onClick={closeExpModal} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleExpSubmit} className="p-4 sm:p-6 space-y-4">
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

export default ProfileAdmin;
