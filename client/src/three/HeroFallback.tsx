import { motion } from "framer-motion";

export default function HeroFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glowing orb */}
      <div className="relative">
        <motion.div
          className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-magic-purple/30 via-magic-sapphire/20 to-magic-purple/30"
          animate={{
            boxShadow: [
              "0 0 60px rgba(124, 58, 237, 0.3), 0 0 120px rgba(124, 58, 237, 0.1), inset 0 0 60px rgba(124, 58, 237, 0.2)",
              "0 0 80px rgba(124, 58, 237, 0.5), 0 0 160px rgba(124, 58, 237, 0.2), inset 0 0 80px rgba(124, 58, 237, 0.3)",
              "0 0 60px rgba(124, 58, 237, 0.3), 0 0 120px rgba(124, 58, 237, 0.1), inset 0 0 60px rgba(124, 58, 237, 0.2)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Inner shimmer */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbiting sparkles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-magic-gold"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [
                Math.cos((i / 5) * Math.PI * 2) * 120,
                Math.cos(((i + 2.5) / 5) * Math.PI * 2) * 120,
                Math.cos(((i + 5) / 5) * Math.PI * 2) * 120,
              ],
              y: [
                Math.sin((i / 5) * Math.PI * 2) * 120,
                Math.sin(((i + 2.5) / 5) * Math.PI * 2) * 120,
                Math.sin(((i + 5) / 5) * Math.PI * 2) * 120,
              ],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}
