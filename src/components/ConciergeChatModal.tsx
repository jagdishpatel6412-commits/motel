import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Phone, 
  MapPin, 
  Coffee, 
  Dog, 
  Car,
  Clock
} from 'lucide-react';
import { MOTEL_INFO } from '../data/motelData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface ConciergeChatModalProps {
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ConciergeChatModal: React.FC<ConciergeChatModalProps> = ({ onClose, onOpenBooking }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello and welcome to The Pinecrest! I'm your Virtual AI Concierge. Ask me anything about our updated rooms, pet policies, 24/7 front desk check-in, trailer parking, or local dining and hiking in Central Oregon.",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What time is check-in & check-out?",
    "Can I bring my dog?",
    "Do you have trailer / boat parking?",
    "Best breakfast spots nearby?",
    "What is the pool temperature?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "Thank you for asking! For immediate front desk assistance, our team is on-site 24/7 at (541) 555-7463.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "The Pinecrest front desk is staffed 24/7! Check-in starts at 3:00 PM (free 1-hr late checkout included with direct booking). Free Wi-Fi, doorstep parking, and morning roaster coffee are included with every stay. Feel free to call us at (541) 555-7463 anytime!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] text-[#332D29] max-w-xl w-full rounded-2xl border border-[#EAE4D9] shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-4 bg-[#332D29] text-white border-b border-[#332D29] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C6239] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white font-serif flex items-center gap-2">
                <span>Pinecrest AI Concierge</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-[#A69D95] font-light">Local Oregon Knowledge & Property Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A69D95] hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-[#FDFBF7]">
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div key={m.id} className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}>
                {isBot && (
                  <div className="w-7 h-7 rounded-lg bg-[#8C6239] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div 
                  className={`p-3.5 rounded-2xl max-w-[82%] leading-relaxed ${
                    isBot 
                      ? 'bg-white text-[#332D29] border border-[#EAE4D9] shadow-xs rounded-tl-sm' 
                      : 'bg-[#8C6239] text-white rounded-tr-sm shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span className={`text-[10px] block mt-1.5 ${isBot ? 'text-[#A69D95]' : 'text-amber-100'}`}>
                    {m.timestamp}
                  </span>
                </div>

                {!isBot && (
                  <div className="w-7 h-7 rounded-lg bg-[#332D29] text-[#EAE4D9] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-[#8C6239] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-white text-[#6D635B] border border-[#EAE4D9] text-xs flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C6239] animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] font-medium text-[#8C6239]">Searching Pinecrest Guide...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Prompts */}
        <div className="p-2.5 bg-[#F7F3EE] border-t border-[#EAE4D9] flex gap-2 overflow-x-auto text-[11px] whitespace-nowrap">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#8C6239] hover:text-white text-[#6D635B] border border-[#EAE4D9] transition cursor-pointer shrink-0 shadow-xs"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#EAE4D9] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about rooms, parking, pets, breakfast..."
            className="flex-1 p-2.5 rounded-xl bg-[#F7F3EE] border border-[#EAE4D9] text-[#332D29] placeholder-[#A69D95] text-xs focus:outline-none focus:border-[#8C6239]"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] disabled:opacity-50 text-white rounded-xl transition cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
