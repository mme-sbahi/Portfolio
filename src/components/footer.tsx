import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="relative py-12 border-t border-border/30"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <motion.div
            className="text-center md:text-left"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Meryeme</h3>
            <p className="text-sm text-muted-foreground">
              © 2025 All rights reserved. Made with{" "}
              <motion.span
                className="inline-block text-red-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                ❤️
              </motion.span>
            </p>
          </motion.div>

          {/* Navigation Links with Stagger */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Home", "About", "Projects", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  color: "var(--primary)",
                  transition: { duration: 0.2 } 
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                }}
                viewport={{ once: true }}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-32 h-32 bg-primary/10 rounded-full blur-3xl top-0 left-1/4"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-32 h-32 bg-accent/10 rounded-full blur-3xl bottom-0 right-1/4"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>
    </motion.footer>
  );
}
