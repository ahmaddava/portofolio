import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    animateBy?: "words" | "characters";
    direction?: "top" | "bottom";
    threshold?: number;
    rootMargin?: string;
    animationFrom?: { filter: string; opacity: number; y?: number };
    animationTo?: { filter: string; opacity: number; y?: number }[];
}

const BlurText = ({
    text = "",
    className = "",
    delay = 100,
    animateBy = "words",
    direction = "top",
    threshold = 0.1,
    rootMargin = "-100px",
    animationFrom,
    animationTo,
}: BlurTextProps) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, margin: rootMargin, amount: threshold });

    const defaultFrom = useMemo(() => ({
        filter: "blur(10px)",
        opacity: 0,
        y: direction === "top" ? -30 : 30,
    }), [direction]);

    const defaultTo = useMemo(() => [
        { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? -15 : 15 },
        { filter: "blur(0px)", opacity: 1, y: 0 },
    ], [direction]);

    const elements = useMemo(() => {
        if (animateBy === "words") {
            return text.split(" ").map((word, i) => ({
                content: word,
                key: `word-${i}`,
            }));
        }
        return text.split("").map((char, i) => ({
            content: char,
            key: `char-${i}`,
        }));
    }, [text, animateBy]);

    return (
        <p
            ref={ref}
            className={`blur-text flex flex-wrap gap-x-2 ${className}`}
        >
            {elements.map(({ content, key }, idx) => (
                <motion.span
                    key={key}
                    initial={animationFrom || defaultFrom}
                    animate={isInView ? (animationTo || defaultTo)[1] : (animationFrom || defaultFrom)}
                    transition={{
                        duration: 0.6,
                        delay: idx * (delay / 1000),
                        ease: "easeOut",
                    }}
                    style={{ display: "inline-block", whiteSpace: content === " " ? "pre" : "normal" }}
                >
                    {content}
                </motion.span>
            ))}
        </p>
    );
};

export default BlurText;
