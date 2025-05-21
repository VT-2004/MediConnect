
import { Calendar, Clock, MessageCircle } from "lucide-react";

const features = [
  {
    title: "Book Doctor Appointments",
    description: "Find and book appointments with trusted healthcare professionals.",
    icon: Calendar,
    color: "bg-medical-blue"
  },
  {
    title: "Real-Time Tracking",
    description: "Track your appointment time with our real-time 45-min countdown system.",
    icon: Clock,
    color: "bg-medical-teal"
  },
  {
    title: "AI Health Assistant",
    description: "Get instant advice for symptoms and common health concerns.",
    icon: MessageCircle,
    color: "bg-medical-green"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How MediConnect Works</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Our platform makes healthcare more accessible with these key features
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
