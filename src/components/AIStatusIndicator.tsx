import { motion } from 'motion/react';
import { Radio, Brain, Volume2 } from 'lucide-react';

interface AIStatusIndicatorProps {
  status: 'idle' | 'listening' | 'processing' | 'speaking';
}

export function AIStatusIndicator({ status }: AIStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'listening':
        return {
          icon: Radio,
          label: 'AI Listening...',
          color: 'from-cyan-400 to-blue-500',
          pulseColor: 'bg-cyan-400',
        };
      case 'processing':
        return {
          icon: Brain,
          label: 'AI Processing...',
          color: 'from-purple-400 to-pink-500',
          pulseColor: 'bg-purple-400',
        };
      case 'speaking':
        return {
          icon: Volume2,
          label: 'AI Responding...',
          color: 'from-purple-500 to-indigo-600',
          pulseColor: 'bg-purple-500',
        };
      default:
        return {
          icon: Radio,
          label: 'AI Ready',
          color: 'from-gray-400 to-gray-500',
          pulseColor: 'bg-gray-400',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated icon container */}
        <div className="relative">
          {status !== 'idle' && (
            <>
              <motion.div
                className={`absolute inset-0 rounded-full ${config.pulseColor} opacity-30`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full ${config.pulseColor} opacity-20`}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
              />
            </>
          )}
          <div
            className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Status label */}
        <div className="text-center">
          <p className="text-white">{config.label}</p>
        </div>

        {/* Activity bars */}
        {(status === 'listening' || status === 'processing' || status === 'speaking') && (
          <div className="flex gap-1 h-12 items-end">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 ${config.pulseColor} rounded-full`}
                animate={{
                  height: ['20%', '100%', '20%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
