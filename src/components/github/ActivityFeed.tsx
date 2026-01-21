import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { fetchGithubActivity, formatEventMessage } from '../../services/GithubService';
import { GitCommit, GitBranch, Star, GitFork, MessageCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Hardcoded fallback username
const FALLBACK_USERNAME = 'ahmaddava';

const ActivityFeed = () => {
    const { profile, loading: profileLoading } = useData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profileLoading) return;

        const loadActivity = async () => {
            setLoading(true);
            // Use fallback username if profile not loaded
            const targetUsername = profile.github && profile.github !== '#'
                ? profile.github.split('/').pop()
                : FALLBACK_USERNAME;

            const data = await fetchGithubActivity(targetUsername || FALLBACK_USERNAME);
            setEvents(data.slice(0, 5));
            setLoading(false);
        };
        loadActivity();
    }, [profile.github, profileLoading]);

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'PushEvent': return GitCommit;
            case 'CreateEvent': return GitBranch;
            case 'WatchEvent': return Star;
            case 'ForkEvent': return GitFork;
            case 'IssueCommentEvent': return MessageCircle;
            default: return Clock;
        }
    };

    if (loading || profileLoading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-canvas-subtle"></div>
                        <div className="flex-1 space-y-1">
                            <div className="h-3 bg-canvas-subtle rounded w-3/4"></div>
                            <div className="h-2 bg-canvas-subtle rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-4 text-fg-muted text-sm">
                <Clock size={20} className="mx-auto mb-1 opacity-50" />
                <p>No recent activity</p>
            </div>
        );
    }

    return (
        <div className="space-y-0">
            {events.map((event, index) => {
                const Icon = getEventIcon(event.type);
                return (
                    <div
                        key={event.id || index}
                        className="flex gap-2 py-2 border-b border-border-default last:border-0 hover:bg-canvas-subtle/50 transition-colors -mx-2 px-2 rounded"
                    >
                        <div className="w-6 h-6 rounded-full bg-canvas-subtle border border-border-default flex items-center justify-center flex-shrink-0">
                            <Icon size={12} className="text-fg-muted" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-fg-default leading-relaxed">
                                <span className="text-fg-muted">{formatEventMessage(event)}</span>
                                {' '}
                                <a
                                    href={`https://github.com/${event.repo?.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-fg-accent hover:underline font-medium"
                                >
                                    {event.repo?.name?.split('/')[1] || event.repo?.name}
                                </a>
                            </p>
                            <p className="text-[10px] text-fg-muted flex items-center gap-1">
                                <Clock size={8} />
                                {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ActivityFeed;
