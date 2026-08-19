import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Petal {
  id: number;
  x: number; // Percentage width
  delay: number; // delay in seconds
  duration: number; // duration in seconds
  size: number; // size in pixels
  opacity: number;
  rotation: number;
  spinSpeed: number;
  horizontalSwing: number;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate a set of unique random petals
    const newPetals = Array.from({ length: 24 }).map((_, i) => {
      const size = Math.random() * 12 + 8; // 8px to 20px
      return {
        id: i,
        x: Math.random() * 100, // random start horizontal %
        delay: Math.random() * 8, // staggered starts
        duration: Math.random() * 8 + 12, // 12s to 20s fall duration
        size,
        opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 opacity
        rotation: Math.random() * 360,
        spinSpeed: Math.random() * 200 + 100, // rotation animation degrees
        horizontalSwing: Math.random() * 40 + 20, // max px swing
      };
    });
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            top: "-5%",
            left: `${petal.x}%`,
            opacity: 0,
            rotate: petal.rotation,
          }}
          animate={{
            top: "105%",
            opacity: [0, petal.opacity, petal.opacity, 0],
            // Combine horizontal drift/swing with vertical descent
            x: [0, petal.horizontalSwing, -petal.horizontalSwing, petal.horizontalSwing / 2],
            rotate: [petal.rotation, petal.rotation + petal.spinSpeed],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: petal.size,
            height: petal.size * 1.3,
            backgroundColor: "#d5c4fd", // Light lavender-purple
            borderRadius: "50% 0 50% 50%", // petal shape
            transformOrigin: "center",
            boxShadow: "0 2px 4px rgba(129, 76, 238, 0.1)",
          }}
        />
      ))}
    </div>
  );
}
