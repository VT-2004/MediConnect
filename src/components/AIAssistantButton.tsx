import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

// Enhanced medical knowledge base
const medicalKnowledge: Record<string, any> = {
  // Existing conditions
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
  // Neurological Disorders
  migraine: {
    causes: ["Hormonal changes", "Stress", "Certain foods", "Environmental factors", "Genetics"],
    precautions: ["Identify and avoid triggers", "Regular sleep schedule", "Stay hydrated", "Manage stress"],
    solutions: ["Rest in dark, quiet room", "Cold compress", "Over-the-counter pain relievers", "Prescription medications if severe"]
  },
  stroke: {
    causes: ["Blood clot", "Hemorrhage", "High blood pressure", "Smoking", "Heart disease"],
    precautions: ["Monitor blood pressure", "Regular exercise", "Healthy diet", "Avoid smoking"],
    solutions: ["IMMEDIATE MEDICAL ATTENTION - call emergency services", "Time-sensitive treatments available at hospital", "Rehabilitation therapy"]
  },
  epilepsy: {
    causes: ["Brain injury", "Genetics", "Brain abnormalities", "Infections"],
    precautions: ["Take medications regularly", "Avoid triggers", "Get adequate sleep", "Avoid alcohol"],
    solutions: ["Anti-seizure medications", "Surgery in some cases", "Vagus nerve stimulation", "Ketogenic diet in some cases"]
  },
  // Cardiovascular Diseases
  hypertension: {
    causes: ["Genetics", "Age", "Diet high in salt", "Lack of exercise", "Stress"],
    precautions: ["Low sodium diet", "Regular exercise", "Limit alcohol", "Avoid smoking", "Manage stress"],
    solutions: ["Blood pressure monitoring", "Medications", "Lifestyle modifications", "Regular medical check-ups"]
  },
  "heart attack": {
    causes: ["Coronary artery disease", "Blood clot", "Plaque rupture", "Coronary spasm"],
    precautions: ["Heart-healthy diet", "Regular exercise", "Cholesterol management", "Stop smoking"],
    solutions: ["IMMEDIATE MEDICAL ATTENTION - call emergency services", "Aspirin (if advised by doctor)", "CPR if person is unresponsive"]
  },
  // Respiratory Disorders
  asthma: {
    causes: ["Allergens", "Exercise", "Cold air", "Respiratory infections", "Air pollutants"],
    precautions: ["Avoid triggers", "Use air purifiers", "Allergy-proof your home", "Get vaccinated for flu"],
    solutions: ["Rescue inhalers", "Long-term control medications", "Breathing exercises", "Action plan for attacks"]
  },
  copd: {
    causes: ["Smoking", "Long-term exposure to irritating gases", "Genetics"],
    precautions: ["Stop smoking", "Avoid air pollutants", "Get vaccinated", "Regular exercise"],
    solutions: ["Bronchodilators", "Inhaled steroids", "Pulmonary rehabilitation", "Oxygen therapy in advanced cases"]
  },
  // Gastrointestinal Disorders
  gerd: {
    causes: ["Weakened lower esophageal sphincter", "Obesity", "Smoking", "Certain foods"],
    precautions: ["Eat smaller meals", "Don't lie down after eating", "Maintain healthy weight", "Avoid trigger foods"],
    solutions: ["Antacids", "H2 blockers", "Proton pump inhibitors", "Lifestyle changes"]
  },
  ibs: {
    causes: ["Abnormal muscle contractions in intestine", "Nervous system abnormalities", "Severe infection", "Stress"],
    precautions: ["Identify trigger foods", "Manage stress", "Regular exercise", "Adequate sleep"],
    solutions: ["Dietary changes", "Fiber supplements", "Anti-diarrheal medications", "Antispasmodics"]
  },
  // Metabolic/Endocrine Disorders
  diabetes: {
    causes: ["Genetics", "Obesity", "Sedentary lifestyle", "Autoimmune reaction (Type 1)"],
    precautions: ["Healthy diet", "Regular exercise", "Monitor blood sugar", "Regular medical check-ups"],
    solutions: ["Insulin therapy (Type 1)", "Oral medications (Type 2)", "Lifestyle modifications", "Continuous glucose monitoring"]
  },
  hypothyroidism: {
    causes: ["Autoimmune disease", "Radiation therapy", "Thyroid surgery", "Medications"],
    precautions: ["Take medication as prescribed", "Regular blood tests", "Maintain healthy diet", "Regular exercise"],
    solutions: ["Synthetic thyroid hormone replacement", "Regular monitoring", "Dietary adjustments"]
  },
  // Mental Health
  anxiety: {
    causes: ["Stress", "Genetics", "Brain chemistry", "Traumatic events", "Medical conditions"],
    precautions: ["Regular exercise", "Adequate sleep", "Limit caffeine and alcohol", "Mindfulness practices"],
    solutions: ["Cognitive behavioral therapy", "Anti-anxiety medications", "Relaxation techniques", "Support groups"]
  },
  depression: {
    causes: ["Brain chemistry", "Hormones", "Genetics", "Life events", "Medications"],
    precautions: ["Regular exercise", "Healthy sleep habits", "Social connection", "Stress management"],
    solutions: ["Psychotherapy", "Antidepressant medications", "Support groups", "Lifestyle changes"]
  },
  // Skin Conditions
  acne: {
    causes: ["Excess oil production", "Bacteria", "Inflammation", "Clogged pores", "Hormones"],
    precautions: ["Regular face washing", "Avoid touching face", "Use non-comedogenic products", "Healthy diet"],
    solutions: ["Topical treatments", "Antibiotics", "Retinoids", "Hormone therapy in some cases"]
  },
  eczema: {
    causes: ["Genetics", "Immune system dysfunction", "Environmental triggers", "Allergens"],
    precautions: ["Identify and avoid triggers", "Gentle skin care", "Humidify dry air", "Avoid harsh soaps"],
    solutions: ["Moisturizers", "Topical corticosteroids", "Antihistamines", "Immunosuppressants in severe cases"]
  },
};

const AIAssistantButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      text: "Hello! I'm your AI Health Assistant. Describe your symptoms,or some guidence about any exact disease, and I'll try to provide some guidance. Please note that I'm not a replacement for professional medical advice.",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const assistantRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect for scrolling to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

    // Generate response based on input
    setTimeout(() => {
      generateResponse(input);
    }, 1000);
  };

  const generateResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let response = "I'm not sure I understand your symptoms. Could you provide more details about what you're experiencing?";
    
    // Check for condition matches in our knowledge base
    const matchedConditions = Object.keys(medicalKnowledge).filter(condition => 
      lowerInput.includes(condition)
    );
    
    if (matchedConditions.length > 0) {
      // Use the first matched condition
      const condition = matchedConditions[0];
      const data = medicalKnowledge[condition];
      
      response = `Based on your description, you might be experiencing **${condition}**.\n\n` +
        `**Possible causes:**\n${data.causes.map((c: string) => `- ${c}`).join('\n')}\n\n` +
        `**Recommended precautions:**\n${data.precautions.map((p: string) => `- ${p}`).join('\n')}\n\n` +
        `**Potential solutions:**\n${data.solutions.map((s: string) => `- ${s}`).join('\n')}\n\n` +
        `Remember, this is not a substitute for professional medical advice. If symptoms persist or worsen, please consult a healthcare provider.`;
    } else {
      // Check for general symptoms
      const commonSymptoms = [
        "pain", "ache", "dizzy", "nausea", "tired", "fatigue", 
        "rash", "swelling", "sore", "breathing", "cough", "fever"
      ];
      
      const foundSymptoms = commonSymptoms.filter(symptom => lowerInput.includes(symptom));
      
      if (foundSymptoms.length > 0) {
        response = `I notice you mentioned symptoms related to ${foundSymptoms.join(", ")}. To give you better guidance, could you provide more details about:\n\n` +
          `- When did these symptoms start?\n` +
          `- Have you noticed any patterns or triggers?\n` +
          `- Are you experiencing any other symptoms?\n\n` +
          `This will help me provide more specific information. Remember, for persistent or severe symptoms, please consult a healthcare provider.`;
      }
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
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid newline
      handleSubmit();
    }
  };

  // Close assistant when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assistantRef.current && !assistantRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-medical-blue hover:bg-medical-blue/90 flex items-center justify-center shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <div ref={assistantRef} className="w-[350px] md:w-[400px] animate-in slide-in-from-bottom">
          <Card className="shadow-xl border border-gray-200">
            <CardHeader className="bg-medical-blue/10 py-3 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-medical-blue" />
                Welcome To AI Health Assistant
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-3">
              <div className="h-[350px] overflow-y-auto p-2 space-y-3 mb-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
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
                                  return <p key={j} className="ml-3">• {line.substring(2)}</p>;
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
                        className={`text-xs mt-1 ${
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
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <Textarea
                  placeholder="Describe your symptoms..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 resize-none h-10 min-h-[2.5rem] py-2"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="bg-medical-blue hover:bg-medical-blue/90 h-10"
                  disabled={isLoading || !input.trim()}
                >
                  Send
                </Button>
              </form>
              
              <div className="text-xs mt-3 text-gray-500">
                <p>This is an AI assistant using medical knowledge for common conditions like headaches, fever, respiratory issues, and more.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIAssistantButton;
