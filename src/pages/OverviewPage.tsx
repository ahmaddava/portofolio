import ProjectsCard from '../components/dashboard/ProjectsCard';
import ActivityFeed from '../components/github/ActivityFeed';
import ContributionGraph from '../components/github/ContributionGraph';

const OverviewPage = () => {
    return (
        <div className="space-y-6">
            {/* Top Row: Contribution Graph + Recent Activity */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Contribution Graph - Main content */}
                <div className="flex-1 min-w-0">
                    <ContributionGraph />
                </div>

                {/* Recent Activity - Sidebar */}
                <div className="w-full lg:w-72 flex-shrink-0">
                    <div className="rounded-lg border border-border-default bg-canvas-default p-4 h-full">
                        <h3 className="text-sm font-semibold text-fg-default mb-3 pb-2 border-b border-border-default">
                            Recent Activity
                        </h3>
                        <ActivityFeed />
                    </div>
                </div>
            </div>

            {/* Pinned Projects */}
            <ProjectsCard />
        </div>
    );
};

export default OverviewPage;
