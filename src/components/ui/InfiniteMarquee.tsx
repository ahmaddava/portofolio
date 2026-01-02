import type { ReactNode, CSSProperties } from "react";

interface InfiniteMarqueeProps {
    children: ReactNode;
    pauseOnHover?: boolean;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

const InfiniteMarquee = ({
    children,
    pauseOnHover = true,
    direction = "left",
    speed = 30,
    className = "",
}: InfiniteMarqueeProps) => {
    const animationDirection = direction === "left" ? "normal" : "reverse";
    const animationDuration = `${speed}s`;

    const marqueeStyle: CSSProperties = {
        display: "flex",
        width: "max-content",
        animation: `scroll ${animationDuration} linear infinite`,
        animationDirection,
    };

    return (
        <div
            className={`overflow-hidden relative group ${className}`}
            style={{
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
        >
            <div
                style={marqueeStyle}
                className={pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}
            >
                {children}
                {children}
            </div>
            <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
};

export default InfiniteMarquee;
