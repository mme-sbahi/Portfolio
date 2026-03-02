import { motion } from "framer-motion";
import { Code, BracketsSquare, Terminal, FileCode, Atom, GitBranch } from "@phosphor-icons/react";

const codeSnippets = [
  "const App = () =>",
  "<Component />",
  "useState()",
  "useEffect()",
  "async/await",
  "npm install",
  "git commit",
  "flex gap-4",
];

const TechOrb = () => {
  return (
    <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] lg:w-[520px] lg:h-[520px] flex items-center justify-center perspective-1000">
      {/* Ambient glow layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-[80px] opacity-20 animate-pulse" />
      <div className="absolute inset-8 bg-gradient-to-tr from-accent via-primary to-secondary rounded-full blur-[60px] opacity-15" />
      
      {/* Floating code snippets */}
      {codeSnippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] md:text-xs font-mono text-primary/60 whitespace-nowrap select-none pointer-events-none"
          style={{
            top: `${10 + (i * 12)}%`,
            left: i % 2 === 0 ? "-10%" : "auto",
            right: i % 2 === 1 ? "-10%" : "auto",
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.3, 0.8, 0.3],
            x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          {snippet}
        </motion.div>
      ))}

      {/* Orbiting tech icons */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[Code, BracketsSquare, Terminal, FileCode, Atom, GitBranch].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 60}deg) translateX(${140}px) rotate(-${i * 60}deg)`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="p-2 md:p-3 glass rounded-xl glow-subtle"
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-accent" weight="light" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Outer ring with dashes */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="0.5"
            strokeDasharray="8 4"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Circuit pattern ring */}
      <motion.div
        className="absolute w-[85%] h-[85%]"
        animate={{ rotateZ: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--secondary))" strokeWidth="0.3" opacity="0.4" />
          {/* Circuit nodes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <rect x="186" y="98" width="6" height="4" rx="1" fill="hsl(var(--accent))" opacity="0.6" />
              <line x1="180" y1="100" x2="190" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.4" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Inner orbital rings */}
      <motion.div
        className="absolute w-[70%] h-[70%]"
        animate={{ rotateX: 75, rotateZ: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-full h-full border border-primary/40 rounded-full" />
      </motion.div>
      
      <motion.div
        className="absolute w-[60%] h-[60%]"
        animate={{ rotateY: 75, rotateZ: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-full h-full border border-accent/40 rounded-full" />
      </motion.div>

      {/* DNA helix effect */}
      <motion.div
        className="absolute w-[50%] h-[50%]"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${i * 30}deg) translateX(${50 + Math.sin(i * 0.5) * 20}px)`,
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full"
          style={{
            background: i % 3 === 0 
              ? "hsl(var(--primary))" 
              : i % 3 === 1 
                ? "hsl(var(--accent))" 
                : "hsl(var(--secondary))",
            top: `${15 + Math.random() * 70}%`,
            left: `${15 + Math.random() * 70}%`,
            boxShadow: `0 0 10px ${i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--accent))" : "hsl(var(--secondary))"}`,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            scale: [0.8, 1.5, 0.8],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central core */}
      <motion.div
        className="relative w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {/* Core glow layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full opacity-70 blur-2xl" />
        <div className="absolute inset-3 bg-gradient-to-tl from-accent via-primary to-secondary rounded-full opacity-50 blur-xl" />
        
        {/* Glass core with hexagon */}
        <motion.div
          className="absolute inset-4 glass-strong rounded-full flex items-center justify-center overflow-hidden border border-white/10"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Animated hexagon layers */}
          <svg className="absolute w-[80%] h-[80%]" viewBox="0 0 100 100">
            <motion.polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="none"
              stroke="url(#coreGradient)"
              strokeWidth="0.8"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
            <motion.polygon
              points="50,15 80,30 80,70 50,85 20,70 20,30"
              fill="none"
              stroke="url(#coreGradient)"
              strokeWidth="0.5"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
            <motion.polygon
              points="50,25 70,35 70,65 50,75 30,65 30,35"
              fill="none"
              stroke="url(#coreGradient)"
              strokeWidth="0.3"
              animate={{ rotate: 360, opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "center" }}
            />
            <defs>
              <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center bracket symbol */}
          <motion.div
            className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-mono font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {"</>"}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full pointer-events-none"
        style={{ clipPath: "circle(50%)" }}
      >
        <motion.div
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-40"
          animate={{ left: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Corner pulse accents */}
      {[0, 90, 180, 270].map((rotation, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full pointer-events-none"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 md:h-10 bg-gradient-to-b from-accent to-transparent rounded-full"
            animate={{ 
              opacity: [0.2, 1, 0.2], 
              scaleY: [0.7, 1.2, 0.7],
              boxShadow: [
                "0 0 5px hsl(var(--accent))",
                "0 0 20px hsl(var(--accent))",
                "0 0 5px hsl(var(--accent))",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      {/* Holographic shimmer overlay */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 40%, hsl(var(--accent) / 0.1) 50%, transparent 60%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default TechOrb;
