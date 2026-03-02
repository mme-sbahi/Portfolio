import { scale } from "framer-motion";

export function slideInFromLeft(delay: number) {
  return {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { delay: delay, duration: 0.5 } },
  };
}

export function sliceInFromRight(delay: number) {
  return {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { delay: delay, duration: 0.5 } },
  };
}

export function sliceInFromTop() {
  return {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };
}
export function sliceInFromBottom(delay: number) {
  return {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: delay, duration: 0.8 } },
  };
}
export function item() {
  return {
    initial: { opacity: 0, y: 20, filter: "blur(10px)", scale: 0.9 },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition:{delay: 0.9, duration: 0.9} },
  };
}
