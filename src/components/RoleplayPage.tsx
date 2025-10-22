import { Mic, MicOff, Volume2, VolumeX, PhoneOff, FileText, Award } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar3D } from './Avatar3D';
import { LiveTranscript } from './LiveTranscript';
import { AIStatusIndicator } from './AIStatusIndicator';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface TranscriptSession {
  text: string;
  scores: {
    pronunciation: number;
    fluency: number;
    grammar: number;
  };
}

export function RoleplayPage() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isAIMuted, setIsAIMuted] = useState(false);
  const [aiStatus, setAiStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [transcriptSession, setTranscriptSession] = useState<TranscriptSession | null>(null);

  const handleStartCall = () => {
    setIsCallActive(true);
    setAiStatus('idle');
    setTimeout(() => {
      setAiStatus('speaking');
      setCurrentTranscript('Hello! Welcome to your English practice session. I am here to help you improve your pronunciation and fluency. Please introduce yourself when you are ready.');
      setTimeout(() => setAiStatus('idle'), 3000);
    }, 1000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setAiStatus('idle');
    setCurrentTranscript('');
    setShowFeedback(false);
    setTranscriptSession(null);
  };

  const handleToggleMic = () => {
    if (!isMicOn) {
      // Turning mic on
      setIsMicOn(true);
    } else {
      // Turning mic off - start recording simulation
      setIsMicOn(false);
      setAiStatus('listening');
      setCurrentTranscript('');
      
      // Simulate user speaking
      setTimeout(() => {
        const mockTranscript = "Hello, my name is Sarah and I'm practicing my English pronunciation today. I want to improve my speaking skills and become more fluent.";
        setCurrentTranscript(mockTranscript);
        
        setTimeout(() => {
          setAiStatus('processing');
          
          setTimeout(() => {
            // Save transcript and scores
            setTranscriptSession({
              text: mockTranscript,
              scores: {
                pronunciation: Math.floor(Math.random() * 20) + 80,
                fluency: Math.floor(Math.random() * 20) + 75,
                grammar: Math.floor(Math.random() * 20) + 85,
              },
            });
            
            // AI responds
            setAiStatus('speaking');
            setCurrentTranscript("Great job! Your pronunciation is very clear. Let's continue with some practice exercises.");
            
            setTimeout(() => {
              setAiStatus('idle');
              setIsMicOn(true);
            }, 3000);
          }, 2000);
        }, 5000);
      }, 500);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {!isCallActive ? (
        /* Pre-call screen */
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-2xl"
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 212, 255, 0.5)',
                  '0 0 60px rgba(0, 212, 255, 0.8)',
                  '0 0 20px rgba(0, 212, 255, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Award className="w-16 h-16 text-white" />
            </motion.div>
            
            <h1 className="text-white mb-4">3D Roleplay Mode</h1>
            <p className="text-white/70 mb-8 text-lg">
              Practice speaking with our AI tutor and get real-time pronunciation feedback
            </p>
            
            <Button
              onClick={handleStartCall}
              className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition-all text-lg"
            >
              Start Practice Session
            </Button>
          </motion.div>
        </div>
      ) : (
        /* Active call screen */
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div>
                <h2 className="text-white">AI English Tutor Session</h2>
                <p className="text-white/60 text-sm">Practice your pronunciation and fluency</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Connected
              </Badge>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                {/* Left panel - AI Status (Desktop only) */}
                <div className="hidden lg:block lg:col-span-3">
                  <AIStatusIndicator status={aiStatus} />
                  
                  {/* Quick stats */}
                  {transcriptSession && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
                    >
                      <h4 className="text-white mb-4">Last Session</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Pronunciation</span>
                            <span className={getScoreColor(transcriptSession.scores.pronunciation)}>
                              {transcriptSession.scores.pronunciation}
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${getScoreBadge(transcriptSession.scores.pronunciation)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${transcriptSession.scores.pronunciation}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Fluency</span>
                            <span className={getScoreColor(transcriptSession.scores.fluency)}>
                              {transcriptSession.scores.fluency}
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${getScoreBadge(transcriptSession.scores.fluency)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${transcriptSession.scores.fluency}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Grammar</span>
                            <span className={getScoreColor(transcriptSession.scores.grammar)}>
                              {transcriptSession.scores.grammar}
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${getScoreBadge(transcriptSession.scores.grammar)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${transcriptSession.scores.grammar}%` }}
                              transition={{ duration: 1, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Center panel - 3D Avatar */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <motion.div
                    className="relative w-full h-full max-h-[600px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Avatar3D
                      isListening={aiStatus === 'listening'}
                      isSpeaking={aiStatus === 'speaking'}
                    />

                    {/* Mobile AI Status */}
                    <div className="lg:hidden absolute top-4 left-4">
                      <div className={`px-4 py-2 rounded-full text-sm text-white backdrop-blur-lg ${
                        aiStatus === 'listening' ? 'bg-cyan-500/80' :
                        aiStatus === 'processing' ? 'bg-purple-500/80' :
                        aiStatus === 'speaking' ? 'bg-purple-600/80' :
                        'bg-gray-500/80'
                      }`}>
                        {aiStatus === 'listening' && '🎤 Listening...'}
                        {aiStatus === 'processing' && '⚙️ Processing...'}
                        {aiStatus === 'speaking' && '🔊 Speaking...'}
                        {aiStatus === 'idle' && '✓ Ready'}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right panel - Live Transcript */}
                <div className="lg:col-span-3">
                  <div className="h-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
                    <LiveTranscript
                      text={currentTranscript}
                      isActive={aiStatus === 'listening' || aiStatus === 'speaking'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control panel */}
          <div className="px-6 py-6 bg-black/40 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center gap-4">
                {/* Mic toggle */}
                <motion.button
                  onClick={handleToggleMic}
                  disabled={aiStatus === 'processing'}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isMicOn
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-cyan-500 text-white hover:bg-cyan-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMicOn ? <Mic className="w-7 h-7" /> : <MicOff className="w-7 h-7" />}
                </motion.button>

                {/* AI Mute toggle */}
                <motion.button
                  onClick={() => setIsAIMuted(!isAIMuted)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    isAIMuted
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAIMuted ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
                </motion.button>

                {/* End call */}
                <motion.button
                  onClick={handleEndCall}
                  className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneOff className="w-7 h-7" />
                </motion.button>

                {/* Show feedback */}
                <motion.button
                  onClick={() => setShowFeedback(!showFeedback)}
                  disabled={!transcriptSession}
                  className="ml-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-5 h-5" />
                  Show Feedback
                </motion.button>
              </div>

              {/* Control labels */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <p className="text-white/60 text-sm">Press Mic to speak</p>
                <span className="text-white/40">•</span>
                <p className="text-white/60 text-sm">AI will respond automatically</p>
              </div>
            </div>
          </div>

          {/* Feedback modal */}
          <AnimatePresence>
            {showFeedback && transcriptSession && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
                onClick={() => setShowFeedback(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white">Session Feedback</h2>
                    <button
                      onClick={() => setShowFeedback(false)}
                      className="text-white/60 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
                      <p className="text-white/70 text-sm mb-2">Pronunciation</p>
                      <div className={`text-3xl ${getScoreColor(transcriptSession.scores.pronunciation)}`}>
                        {transcriptSession.scores.pronunciation}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
                      <p className="text-white/70 text-sm mb-2">Fluency</p>
                      <div className={`text-3xl ${getScoreColor(transcriptSession.scores.fluency)}`}>
                        {transcriptSession.scores.fluency}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
                      <p className="text-white/70 text-sm mb-2">Grammar</p>
                      <div className={`text-3xl ${getScoreColor(transcriptSession.scores.grammar)}`}>
                        {transcriptSession.scores.grammar}
                      </div>
                    </div>
                  </div>

                  {/* Transcript */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                    <h4 className="text-white mb-3">Your Speech</h4>
                    <p className="text-white/80 leading-relaxed">{transcriptSession.text}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
                    <h4 className="text-white mb-3">Recommendations</h4>
                    <ul className="space-y-2 text-white/80">
                      <li>• Continue practicing pronunciation of complex words</li>
                      <li>• Maintain your natural speaking pace</li>
                      <li>• Great job on sentence structure and grammar!</li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
