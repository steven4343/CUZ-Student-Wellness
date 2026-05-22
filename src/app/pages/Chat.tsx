import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, User, Bot, ArrowLeft, Shield, Clock } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Avatar } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import cavendishLogo from "../../imports/cavendish_logo.jpg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "counsellor";
  timestamp: Date;
}

const autoResponses = [
  "Thank you for reaching out. I'm here to listen and support you. Can you tell me more about what's on your mind?",
  "I understand this must be difficult for you. You're taking a brave step by talking about it.",
  "That sounds challenging. How has this been affecting your daily life and studies?",
  "Your feelings are completely valid. Many students experience similar challenges.",
  "I appreciate you sharing that with me. What do you think would help you feel better right now?",
  "It's important that you're seeking support. Have you tried any coping strategies so far?",
  "Let's work through this together. What are your main concerns at the moment?",
  "I'm here to support you through this. Remember, you don't have to face this alone."
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Dr. Sarah, a licensed counsellor. This is a safe, confidential space. How can I support you today?",
      sender: "counsellor",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate counsellor typing and response
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
      const counsellorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "counsellor",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, counsellorMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white">
              <img src={cavendishLogo} alt="Cavendish University" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-bold text-gray-900">CUZ Student Wellness</div>
              <div className="text-xs text-gray-600">Mental Health & Counselling</div>
            </div>
          </Link>
          <Link to="/support" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Support</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-24 pb-6 px-4 sm:px-6 h-screen flex flex-col">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Anonymous Chat Support
                </h1>
                <p className="text-gray-600">
                  Connect with a professional counsellor in real-time
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Anonymous
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  24/7 Available
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Chat Container */}
          <Card className="flex-1 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-blue-600">
                  <div className="flex items-center justify-center h-full w-full">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-bold text-gray-900">Dr. Sarah Mwansa</h3>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online Now
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-green-600" : "bg-blue-600"}`}>
                      <div className="flex items-center justify-center h-full w-full">
                        {message.sender === "user" ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </Avatar>
                    <div className={`rounded-2xl p-4 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}>
                      <p className="text-sm sm:text-base">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 bg-blue-600">
                      <div className="flex items-center justify-center h-full w-full">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </Avatar>
                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Press Enter to send)"
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This chat is completely anonymous and confidential. Your identity is protected.
              </p>
            </div>
          </Card>

          {/* Disclaimer */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Need immediate crisis support? Call our 24/7 hotline: <strong className="text-blue-600">+260-XXX-XXXX</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}