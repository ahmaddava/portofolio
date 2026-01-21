export interface GithubEvent {
    id: string;
    type: string;
    actor: {
        login: string;
        avatar_url: string;
    };
    repo: {
        name: string;
        url: string;
    };
    payload: {
        action?: string;
        ref?: string;
        ref_type?: string;
        commits?: Array<{
            message: string;
            sha: string;
        }>;
    };
    created_at: string;
}

const GITHUB_USERNAME = 'ahmaddava'; // Default fallback

export const fetchGithubActivity = async (username: string = GITHUB_USERNAME): Promise<GithubEvent[]> => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=10`);
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub activity');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        return [];
    }
};

export const formatEventMessage = (event: GithubEvent) => {
    switch (event.type) {
        case 'PushEvent':
            return `Pushed ${event.payload.commits?.length || 0} commits to`;
        case 'CreateEvent':
            return `Created ${event.payload.ref_type || 'repository'}`;
        case 'WatchEvent':
            return 'Starred repository';
        case 'ForkEvent':
            return 'Forked repository';
        case 'PullRequestEvent':
            return `${event.payload.action} pull request in`;
        case 'IssuesEvent':
            return `${event.payload.action} issue in`;
        default:
            return 'Acted on';
    }
};
