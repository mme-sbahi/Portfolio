import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.8, delay: progress >= 100 ? 0.2 : 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-bold gradient-text">meryeme</h1>
      </motion.div>

      <div className="w-64 md:w-96">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative h-1 bg-muted rounded-full overflow-hidden"
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-accent glow-pink"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-4 text-muted-foreground text-sm"
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
