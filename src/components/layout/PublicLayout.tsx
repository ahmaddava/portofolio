import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface PublicLayoutProps {
    children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-canvas-default text-fg-default">
            <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

            <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Column */}
                    <div className={`w-full md:w-80 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
                        <Sidebar />
                    </div>

                    {/* Main Content Column */}
                    <main className="flex-1 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PublicLayout;
