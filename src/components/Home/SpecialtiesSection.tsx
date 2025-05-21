
const specialties = [
  {
    name: "Cardiology",
    description: "Heart health specialists",
    image: "https://img.freepik.com/free-vector/cardiology-concept-illustration_114360-6987.jpg"
  },
  {
    name: "Dermatology",
    description: "Skin care experts",
    image: "https://img.freepik.com/free-vector/dermatologist-concept-illustration_114360-6968.jpg"
  },
  {
    name: "Pediatrics", 
    description: "Children's healthcare",
    image: "https://img.freepik.com/free-vector/pediatrician-concept-illustration_114360-8669.jpg"
  },
  {
    name: "Orthopedics",
    description: "Bone and joint specialists",
    image: "https://img.freepik.com/free-vector/orthopedics-concept-illustration_114360-8382.jpg"
  }
];

const SpecialtiesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Medical Specialties</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Find doctors across various medical specializations
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={specialty.image}
                  alt={specialty.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{specialty.name}</h3>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
