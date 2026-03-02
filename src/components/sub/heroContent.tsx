"use client";
import { motion } from "framer-motion";
import { item, sliceInFromBottom } from "../../../utils/motion";
import { Button } from "@/components/ui/button";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import TechOrb from "./TechOrb";
export default function HeroContent() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="container mx-auto px-4 py-20 relative z-10"
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              variants={sliceInFromBottom(0.2)}
            >
              Hi, I'm <span className="gradient-text">Meryeme</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl gradient-text">
                Frontend Developer
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl"
              variants={sliceInFromBottom(0.7)}
            >
              Crafting modern, responsive, and user-friendly websites with
              passion and precision.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.15 }}
            >
              <motion.div variants={item()}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:glow-pink transition-all duration-300 text-lg px-8"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                      setTimeout(() => {
                        contactSection.classList.add(
                          "ring-4",
                          "ring-primary/50",
                          "transition-all",
                          "duration-1000"
                        );
                        setTimeout(() => {
                          contactSection.classList.remove(
                            "ring-4",
                            "ring-primary/50"
                          );
                        }, 2000);
                      }, 500);
                    }
                  }}
                >
                  Hire Me
                </Button>
              </motion.div>

              <motion.div variants={item()}>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass hover:glass-strong hover:glow-cyan transition-all duration-300 text-lg px-8 text-white"
                  onClick={() => {
                    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
                  }}
                >
                  View Resume
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              variants={sliceInFromBottom(0.9)}
            >
              <Button
                size="icon"
                variant="ghost"
                className="glass hover:glow-pink transition-all duration-300 rounded-full text-white"
                onClick={() =>
                  window.open("https://github.com/mme-sbahi", "_blank")
                }
              >
                <GithubLogo className="h-6 w-6" weight="light" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="glass hover:glow-cyan transition-all duration-300 rounded-full text-white"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/meryememesbahi/",
                    "_blank"
                  )
                }
              >
                <LinkedinLogo className="h-6 w-6" weight="light" />
              </Button>
            </motion.div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
            >
              <TechOrb />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

{
  /* <motion.div
initial="hidden"
animate="visible"
className=" flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
>
<div className="size-full flex flex-col gap-5 justify-center m-auto text-start">
  <motion.div
    variants={slideInFromLeft(0.5)}
    className="flex flex-col gap-6 mt-6 text-[6px] text-bold text-white max-w-[600px] w-auto h-auto"
  >
    Providing{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
      the best
    </span>
    project experience
  </motion.div>
  <motion.p
    variants={slideInFromLeft(0.8)}
    className="text-lg text-gray-400 my-5 max-w-[600px]"
  >
    {" "}
    I&apos;m a frontend developer with a passion for creating visually
    stunning and user-friendly web applications.
  </motion.p>
  <motion.a variants={slideInFromLeft(1)} className="py-2 text-center text-white cursor-pointer rounded-lg max-w-[200px]">
      Learn More
  </motion.a>
  <motion.div ></motion.div>
</div>
</motion.div> */
}
