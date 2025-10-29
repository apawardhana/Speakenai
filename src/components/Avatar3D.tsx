import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Avatar3DProps {
  isListening: boolean;
  isSpeaking: boolean;
}

export function Avatar3D({ isListening, isSpeaking }: Avatar3DProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [mouthOpen, setMouthOpen] = useState(0);

  // Simulate eye tracking movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSpeaking) {
        setEyePosition({
          x: Math.random() * 10 - 5,
          y: Math.random() * 10 - 5,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Simulate lip-sync when speaking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpeaking) {
      interval = setInterval(() => {
        setMouthOpen(Math.random() * 100);
      }, 150);
    } else {
      setMouthOpen(0);
    }

    return () => clearInterval(interval);
  }, [isSpeaking]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${
            isListening ? '#00d4ff' : isSpeaking ? '#b066ff' : '#00ffff'
          }, transparent)`,
          filter: 'blur(60px)',
        }}
        animate={{
          scale: isListening || isSpeaking ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 3D Avatar Container */}
      <motion.div
        className="relative w-64 h-80 md:w-80 md:h-96"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        animate={{
          rotateY: eyePosition.x * 0.5,
          rotateX: -eyePosition.y * 0.3,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Head */}
        <div
          className="absolute inset-0 rounded-t-full bg-gradient-to-br from-blue-100 via-white to-blue-50"
          style={{
            boxShadow:
              '0 20px 60px rgba(0, 212, 255, 0.3), inset 0 2px 20px rgba(255, 255, 255, 0.5)',
            transform: 'translateZ(20px)',
          }}
        >
          {/* Face features container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
            {/* Eyes */}
            <div className="flex gap-8 mb-8">
              {/* Left Eye */}
              <motion.div
                className="w-12 h-12 bg-white rounded-full shadow-lg overflow-hidden"
                style={{
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <motion.div
                  className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mt-3 mx-auto relative"
                  animate={{
                    x: eyePosition.x,
                    y: eyePosition.y,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
                </motion.div>
              </motion.div>

              {/* Right Eye */}
              <motion.div
                className="w-12 h-12 bg-white rounded-full shadow-lg overflow-hidden"
                style={{
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <motion.div
                  className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mt-3 mx-auto relative"
                  animate={{
                    x: eyePosition.x,
                    y: eyePosition.y,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
                </motion.div>
              </motion.div>
            </div>

            {/* Nose */}
            <div
              className="w-4 h-6 bg-gradient-to-b from-blue-100 to-blue-200 rounded-full mb-4"
              style={{
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />

            {/* Mouth */}
            <motion.div
              className="w-20 h-10 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full overflow-hidden"
              style={{
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
              animate={{
                scaleY: isSpeaking ? 1 + mouthOpen / 200 : 1,
              }}
              transition={{ duration: 0.1 }}
            >
              <div className="w-full h-1/2 bg-gradient-to-b from-red-300 to-red-400" />
            </motion.div>
          </div>
        </div>

        {/* Neck */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-blue-50 to-blue-100 rounded-b-3xl"
          style={{
            boxShadow: '0 10px 30px rgba(0, 212, 255, 0.2)',
          }}
        />
      </motion.div>

      {/* Status indicator */}
      {isListening && (
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-cyan-500 text-white rounded-full text-sm shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            Listening...
          </div>
        </motion.div>
      )}

      {isSpeaking && (
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-purple-500 text-white rounded-full text-sm shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            Speaking...
          </div>
        </motion.div>
      )}
    </div>
  );
}
