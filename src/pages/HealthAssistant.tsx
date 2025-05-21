
import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface Message {
  id: number;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

// Mock responses for symptoms - in a real app, this would be replaced by an AI model
const mockResponses: Record<string, any> = {
  headache: {
    causes: ["Stress", "Dehydration", "Lack of sleep", "Eye strain", "Sinus congestion"],
    precautions: ["Rest in a quiet, dark room", "Apply a cold compress", "Stay hydrated", "Take breaks from screens"],
    solutions: ["Over-the-counter pain relievers like acetaminophen or ibuprofen", "Regular sleep schedule", "Stress management techniques"]
  },
  fever: {
    causes: ["Viral infection", "Bacterial infection", "Heat exhaustion", "Inflammatory conditions"],
    precautions: ["Rest", "Stay hydrated", "Dress lightly", "Monitor temperature"],
    solutions: ["Over-the-counter fever reducers", "Luke-warm bath", "Consult doctor if fever persists over 3 days or exceeds 103°F (39.4°C)"]
  },
  cough: {
    causes: ["Common cold", "Allergies", "Asthma", "Respiratory infections"],
    precautions: ["Stay hydrated", "Avoid irritants", "Rest your voice", "Humidify your environment"],
    solutions: ["Honey and warm water", "Cough drops", "Over-the-counter cough suppressants", "Consult doctor if cough lasts more than 2 weeks"]
  },
  // Add more symptoms as needed
};

const HealthAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      text: "Hello! I'm your AI Health Assistant. Describe your symptoms, and I'll try to provide some guidance. Please note that I'm not a replacement for professional medical advice.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      // Generate response based on keywords in the input
      const lowerInput = input.toLowerCase();
      let response = "I'm not sure I understand your symptoms. Could you provide more details?";
      
      const symptomMatches = Object.keys(mockResponses).filter(symptom => 
        lowerInput.includes(symptom)
      );
      
      if (symptomMatches.length > 0) {
        const symptom = symptomMatches[0];
        const data = mockResponses[symptom];
        
        response = `Based on your description, you might be experiencing a **${symptom}**.\n\n` +
          `**Possible causes:**\n${data.causes.map((c: string) => `- ${c}`).join('\n')}\n\n` +
          `**Recommended precautions:**\n${data.precautions.map((p: string) => `- ${p}`).join('\n')}\n\n` +
          `**Potential solutions:**\n${data.solutions.map((s: string) => `- ${s}`).join('\n')}\n\n` +
          `Remember, this is not a substitute for professional medical advice. If symptoms persist or worsen, please consult a healthcare provider.`;
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        text: response,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-4">
            <CardHeader className="bg-medical-blue/10">
              <CardTitle className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-medical-blue" />
                AI Health Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-2">
                <p>
                  This AI assistant can provide information about common symptoms and suggest possible causes, 
                  precautions, and solutions. For demonstration purposes, try asking about these symptoms:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Headache</li>
                  <li>Fever</li>
                  <li>Cough</li>
                </ul>
                <div className="mt-2 text-xs p-2 bg-yellow-50 border-l-4 border-yellow-400">
                  <strong>Note:</strong> This is not a substitute for professional medical advice. 
                  Always consult a healthcare provider for medical concerns.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent className="p-4 max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-medical-blue text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {/* Process markdown-like syntax in assistant responses */}
                      {message.type === 'assistant' ? (
                        <div>
                          {message.text.split('\n\n').map((paragraph, i) => (
                            <div key={i} className="mb-2">
                              {paragraph.split('\n').map((line, j) => {
                                if (line.startsWith('**') && line.endsWith('**')) {
                                  // Bold text
                                  return <p key={j} className="font-bold">{line.replace(/\*\*/g, '')}</p>;
                                } else if (line.startsWith('- ')) {
                                  // List item
                                  return <p key={j} className="ml-4">• {line.substring(2)}</p>;
                                } else {
                                  return <p key={j}>{line}</p>;
                                }
                              })}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>{message.text}</p>
                      )}
                      <div
                        className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-4 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              placeholder="Describe your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 resize-none"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="bg-medical-blue hover:bg-medical-blue/90"
              disabled={isLoading || !input.trim()}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default HealthAssistant;
