
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-medical-blue to-medical-teal text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to prioritize your health?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of patients and doctors on MediConnect today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="bg-white text-medical-blue hover:bg-gray-100">
              Sign Up Now
            </Button>
          </Link>
          <Link to="/doctors">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Browse Doctors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
