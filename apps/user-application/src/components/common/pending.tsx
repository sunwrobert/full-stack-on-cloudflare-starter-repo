import { motion } from "framer-motion";

export default function Pending() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary"
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-1"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              className="h-2 w-2 rounded-full bg-primary"
              key={i}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
