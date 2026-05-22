import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { MessageCircle, Send, Shield, User, ChevronRight, Lock, Clock, Play, StopCircle } from "lucide-react";
import { Link } from "react-router";

type Message = { text: string; sender: "user" | "counsellor"; time: string };

const cannedResponses: Record<string, string> = {
  "anxiety": "It's completely normal to feel anxious, especially as a student. Try box breathing: inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Would you like to talk more about what's triggering your anxiety?",
  "stress": "Academic stress is very common. Remember to break tasks into smaller steps, take regular breaks, and reach out for support. What specific area is causing you the most stress right now?",
  "sad": "I hear you, and it's okay to feel sad sometimes. You don't have to go through it alone. Would you like to talk about what's been on your mind?",
  "exam": "Exam pressure can feel overwhelming. Make a study schedule, practice past papers, and don't forget to take care of your body — sleep, eat well, and stay hydrated. You've got this!",
  "sleep": "Sleep is crucial for mental health. Try to maintain a consistent sleep schedule, avoid screens 30 minutes before bed, and create a relaxing bedtime routine.",
  "lonely": "Feeling lonely at university is more common than you think. Consider joining a student club, reaching out to a classmate, or visiting the student common areas. You deserve connection.",
  "help": "You've taken a brave step by reaching out. I'm here to listen and support you. What's on your mind today?",
  "thanks": "You're welcome! Remember, you can always come back and chat anytime. Your mental health matters.",
  "default": "Thank you for sharing that with me. Can you tell me more about how you've been feeling? I'm here to listen without judgment.",
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  for (const [key, resp] of Object.entries(cannedResponses)) {
    if (key === "default") continue;
    if (lower.includes(key)) return resp;
  }
  return cannedResponses.default;
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AnonymousChat() {
  const [sessionActive, setSessionActive] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const startSession = () => {
    const id = "CHT-" + Date.now().toString(36).toUpperCase();
    setSessionId(id);
    setSessionStart(new Date());
    setSessionActive(true);
    const welcome: Message = {
      text: "Welcome to CUZ Anonymous Chat. This is a confidential space. A professional counsellor is here to support you. How are you feeling today?",
      sender: "counsellor",
      time: getTime(),
    };
    setMessages([welcome]);
  };

  const endSession = () => {
    const endMsg: Message = {
      text: "Your session has ended. If you need further support, please book an appointment or start a new chat. Take care 💚",
      sender: "counsellor",
      time: getTime(),
    };
    setMessages(prev => [...prev, endMsg]);
    setSessionActive(false);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const userMsg: Message = { text: message, sender: "user", time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply: Message = {
        text: getResponse(message),
        sender: "counsellor",
        time: getTime(),
      };
      setMessages(prev => [...prev, reply]);
    }, 1500 + Math.random() * 2000);
  };

  const sessionDuration = sessionStart
    ? Math.floor((Date.now() - sessionStart.getTime()) / 60000)
    : 0;

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="text-green-600 hover:text-green-700 mb-6 inline-flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Anonymous Chat</h1>
              <p className="text-lg text-gray-600">Speak with a counsellor confidentially</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            {!sessionActive && messages.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Start an Anonymous Session</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your identity is completely protected. No personal information is stored. Speak freely with a professional counsellor.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-8">
                  <Lock className="w-4 h-4" />
                  <span>End-to-end encrypted · No history saved · 100% anonymous</span>
                </div>
                <button onClick={startSession}
                  className="px-10 py-5 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all text-xl font-medium shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                >
                  <Play className="w-6 h-6" />
                  Start Anonymous Chat
                </button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[550px]">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Professional Counsellor</div>
                      <div className="text-xs text-green-600 flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${sessionActive ? "bg-green-500" : "bg-gray-400"}`} />
                        {sessionActive ? "Online" : "Session Ended"}
                        {sessionActive && sessionId && (
                          <span className="text-gray-400 ml-2">· {sessionId} · {sessionDuration}m</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {sessionActive && (
                    <button onClick={endSession}
                      className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <StopCircle className="w-4 h-4" /> End Session
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-900 rounded-bl-md"
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <span className={`text-xs mt-1.5 block ${msg.sender === "user" ? "text-blue-200" : "text-gray-400"}`}>
                          {msg.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-5 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSend()}
                      placeholder={sessionActive ? "Type your message here..." : "Session ended. Start a new chat."}
                      disabled={!sessionActive}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                    <button onClick={handleSend} disabled={!sessionActive || !message.trim()}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!sessionActive && messages.length > 0 && (
              <div className="mt-4 text-center">
                <button onClick={startSession}
                  className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-medium shadow-lg"
                >
                  <Play className="w-5 h-5 inline mr-2" /> Start New Session
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl p-8 shadow-lg">
              <Shield className="w-10 h-10 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">100% Anonymous</h3>
              <ul className="space-y-3 text-sm text-green-100">
                <li className="flex items-start gap-2"><Shield className="w-5 h-5 mt-0.5 flex-shrink-0" /><span>Your identity is never revealed</span></li>
                <li className="flex items-start gap-2"><Shield className="w-5 h-5 mt-0.5 flex-shrink-0" /><span>End-to-end encrypted conversations</span></li>
                <li className="flex items-start gap-2"><Shield className="w-5 h-5 mt-0.5 flex-shrink-0" /><span>No chat history stored after session</span></li>
                <li className="flex items-start gap-2"><Shield className="w-5 h-5 mt-0.5 flex-shrink-0" /><span>Available 24/7 for immediate support</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Need Immediate Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you're in crisis or need urgent support, please contact our emergency line.
              </p>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-700">24/7 Crisis Line</div>
                <div className="text-lg text-red-600">+260 977 000 000</div>
              </div>
            </div>

            {sessionActive && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Session Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Session ID</span><span className="font-mono text-xs">{sessionId}</span></div>
                  <div className="flex justify-between"><span>Duration</span><span>{sessionDuration} minutes</span></div>
                  <div className="flex justify-between"><span>Messages</span><span>{messages.length}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
