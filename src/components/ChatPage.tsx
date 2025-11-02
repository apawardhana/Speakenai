import { Send, BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { GrammarHighlight, GrammarFeedback } from './GrammarHighlight';

interface GrammarError {
  start: number;
  end: number;
  message: string;
  suggestion: string;
  type: 'grammar' | 'spelling' | 'style';
}

interface Message {
  id: string;
  message: string;
  sender: 'user' | 'ai';
  timestamp: string;
  errors?: GrammarError[];
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      message: 'Hello! I\'m Speaken.AI, your English learning assistant. I\'m here to help you improve your English writing skills. Try sending me a message, and I\'ll provide grammar corrections and suggestions!',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const analyzeGrammar = (text: string): GrammarError[] => {
    const errors: GrammarError[] = [];
    
    // Mock grammar analysis - in real app, this would call an API
    if (text.includes('dont')) {
      const index = text.indexOf('dont');
      errors.push({
        start: index,
        end: index + 4,
        message: 'Missing apostrophe in contraction',
        suggestion: "don't",
        type: 'grammar',
      });
    }
    
    if (text.match(/\bi is\b/i)) {
      const match = text.match(/\bi is\b/i);
      if (match && match.index !== undefined) {
        errors.push({
          start: match.index,
          end: match.index + match[0].length,
          message: 'Subject-verb agreement error',
          suggestion: 'I am',
          type: 'grammar',
        });
      }
    }

    if (text.match(/\bhe go\b|\bshe go\b/i)) {
      const match = text.match(/\bhe go\b|\bshe go\b/i);
      if (match && match.index !== undefined) {
        errors.push({
          start: match.index,
          end: match.index + match[0].length,
          message: 'Missing verb conjugation',
          suggestion: match[0].split(' ')[0] + ' goes',
          type: 'grammar',
        });
      }
    }

    if (text.match(/\bthere\b.*\bthere\b/i) && text.includes('their')) {
      const index = text.lastIndexOf('there');
      if (text.includes('own') || text.includes('house')) {
        errors.push({
          start: index,
          end: index + 5,
          message: 'Incorrect homophone usage',
          suggestion: 'their',
          type: 'spelling',
        });
      }
    }

    return errors;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const errors = analyzeGrammar(inputValue);

    const userMessage: Message = {
      id: Date.now().toString(),
      message: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      errors,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // AI response with feedback
    setTimeout(() => {
      let feedback = '';
      if (errors.length > 0) {
        feedback = `Great effort! I found ${errors.length} area${errors.length > 1 ? 's' : ''} to improve:\n\n`;
        errors.forEach((error, index) => {
          feedback += `${index + 1}. ${error.message}\n   Suggestion: "${error.suggestion}"\n\n`;
        });
        feedback += 'Keep practicing! Your English is improving.';
      } else {
        feedback = 'Excellent! Your grammar is correct. Well done! 🎉';
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: feedback,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Header */}
      <div className="bg-white border-b border-border shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2>Chat Mode - Grammar Practice</h2>
            <p className="text-muted-foreground">Write in English and get instant feedback</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div ref={scrollRef} className="h-full overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto pb-32 md:pb-8">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-6">
                <div className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                    {msg.sender === 'user' ? 'You' : 'AI'}
                  </div>
                  <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%] md:max-w-[65%]`}>
                    <div
                      className={`px-6 py-4 rounded-2xl shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border border-border'
                      }`}
                    >
                      {msg.errors && msg.errors.length > 0 ? (
                        <GrammarHighlight
                          text={msg.message}
                          errors={msg.errors}
                          onErrorClick={setSelectedError}
                        />
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 px-2">{msg.timestamp}</span>
                  </div>
                </div>
                
                {msg.errors && msg.errors.length > 0 && selectedError && (
                  <div className="mt-4 ml-14">
                    <GrammarFeedback
                      error={selectedError}
                      onClose={() => setSelectedError(null)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-border shadow-lg px-6 py-6 pb-24 md:pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-secondary rounded-2xl px-6 py-4 shadow-sm">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message in English..."
                className="w-full bg-transparent resize-none outline-none max-h-32"
                rows={1}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-4 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Try typing sentences with grammar mistakes to see the analysis in action
          </p>
        </div>
      </div>
    </div>
  );
}
