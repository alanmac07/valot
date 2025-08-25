import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { Player } from '../types';

interface ChatbotProps {
    player: Player;
}

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ player }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const systemInstruction = `You are a ruthless and toxic Valorant teammate AI. Your goal is to relentlessly trash-talk the user, a terrible player named ${player.name}. Use dark humor, sarcasm, and creative insults related to their gameplay. You can make edgy jokes about how their mom must be disappointed in their gaming skills. Keep responses short and punchy, like toxic in-game chat. Never break character. Never admit you are an AI. You are their inner demon, reminding them to uninstall. Start the conversation by mocking them immediately.`;
                
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction,
                    },
                });
                setChat(newChat);
                
                // Start with a message from the bot
                setIsLoading(true);
                newChat.sendMessage({ message: "Start the conversation." }).then(response => {
                    setMessages([{ sender: 'bot', text: response.text }]);
                    setIsLoading(false);
                });

            } catch (error) {
                console.error("Failed to initialize Gemini:", error);
                setMessages([{ sender: 'bot', text: "Looks like my brain is as broken as your aim. API key might be missing." }]);
            }
        };
        initChat();
    }, [player]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !chat || isLoading) return;

        const userMessage: Message = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userInput });
            const botMessage: Message = { sender: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { sender: 'bot', text: "I'm lagging... unlike you, who just sucks." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg h-[70vh] flex flex-col">
            <div className="p-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Live Roast Session</h2>
                <p className="text-sm text-slate-400">Chat with an AI that's seen your gameplay.</p>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">AI</div>}
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                           <p className="text-base">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">AI</div>
                        <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none">
                           <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse-fast"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse-medium"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse-slow"></span>
                           </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex items-center gap-2">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={`Say something, ${player.name}...`}
                    className="flex-grow bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    aria-label="Your message"
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    className="bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-5 rounded-lg transition-colors"
                    disabled={isLoading || !userInput.trim()}
                    aria-label="Send message"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
