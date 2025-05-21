
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    testimonial: "MediConnect made it so easy to find a specialist and book an appointment. The AI health assistant was surprisingly helpful for my initial concerns.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    testimonial: "As a doctor, I appreciate how MediConnect streamlines my schedule and helps me connect with patients who need my expertise.",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    name: "Emily Wilson",
    role: "Patient",
    testimonial: "The appointment timer feature ensures sessions start and end on time, which respects everyone's schedule. Such a thoughtful addition!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What People Are Saying</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Read what patients and healthcare professionals think about MediConnect
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
