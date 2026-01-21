import { useData } from '../../context/DataContext';
import SectionCard from '../ui/SectionCard';
import { Mail, MapPin, Users } from 'lucide-react';

const ProfileCard = () => {
    const { profile } = useData();

    return (
        <SectionCard title="Profile" className="h-full">
            <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                    <img
                        src={profile.profile_image}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full border border-border-default"
                    />
                    <div>
                        <h2 className="text-xl font-bold text-fg-default">{profile.name}</h2>
                        <p className="text-fg-muted text-sm mb-1">{profile.tagline}</p>
                        <span className="inline-block px-2 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-medium">
                            Available for hire
                        </span>
                    </div>
                </div>

                <div className="text-sm text-fg-default space-y-2">
                    <p>{profile.description}</p>
                </div>

                <div className="flex flex-col gap-2 text-sm text-fg-muted">
                    <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span><strong className="text-fg-default">24</strong> followers · <strong className="text-fg-default">12</strong> following</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>Indonesia</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <a href={`mailto:${profile.email}`} className="hover:text-fg-accent">{profile.email}</a>
                    </div>
                    {/* Website logic could go here if added to profile data */}
                </div>
            </div>
        </SectionCard>
    );
};

export default ProfileCard;
