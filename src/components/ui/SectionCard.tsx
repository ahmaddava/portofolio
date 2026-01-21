import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface SectionCardProps {
    title: string;
    children: ReactNode;
    className?: string;
    action?: {
        label: string;
        href: string;
    };
}

const SectionCard = ({ title, children, className, action }: SectionCardProps) => {
    return (
        <div className={cn("border border-border-default rounded-md bg-canvas-default overflow-hidden", className)}>
            <div className="flex items-center justify-between px-4 py-3 bg-canvas-subtle border-b border-border-default">
                <h3 className="text-sm font-semibold text-fg-default">{title}</h3>
                {action && (
                    <Link to={action.href} className="text-xs text-fg-muted hover:text-fg-accent transition-colors">
                        {action.label}
                    </Link>
                )}
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};

export default SectionCard;
