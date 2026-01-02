import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    animationFrom?: { opacity: number; y?: number; filter?: string };
    animationTo?: { opacity: number; y?: number; filter?: string };
    threshold?: number;
    rootMargin?: string;
    textAlign?: "left" | "right" | "center" | "justify";
    onLetterAnimationComplete?: () => void;
}

const SplitText = ({
    text = "",
    className = "",
    delay = 50,
    animationFrom = { opacity: 0, y: 40, filter: "blur(8px)" },
    animationTo = { opacity: 1, y: 0, filter: "blur(0px)" },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onLetterAnimationComplete,
}: SplitTextProps) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, margin: rootMargin, amount: threshold });

    const letters = useMemo(() => {
        const result: { char: string; key: string }[] = [];
        let idx = 0;
        for (const char of text) {
            result.push({ char, key: `${char}-${idx}` });
            idx++;
        }
        return result;
    }, [text]);

    return (
        <p
            ref={ref}
            className={`split-text ${className}`}
            style={{ textAlign, display: "flex", flexWrap: "wrap", justifyContent: textAlign === "center" ? "center" : "flex-start" }}
        >
            {letters.map(({ char, key }, idx) => (
                <motion.span
                    key={key}
                    initial={animationFrom}
                    animate={isInView ? animationTo : animationFrom}
                    transition={{
                        duration: 0.5,
                        delay: idx * (delay / 1000),
                        ease: [0.2, 0.65, 0.3, 0.9],
                    }}
                    onAnimationComplete={idx === letters.length - 1 ? onLetterAnimationComplete : undefined}
                    style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </p>
    );
};

export default SplitText;
