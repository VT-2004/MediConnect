
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Your Health Is Our <span className="text-medical-blue">Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
              Book appointments with qualified doctors and get instant AI-powered health advice.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register">
                <Button size="lg" className="bg-medical-blue hover:bg-medical-blue/90 text-base">
                  Get Started
                </Button>
              </Link>
              <Link to="/doctors">
                <Button size="lg" variant="outline" className="text-base">
                  Find Doctors
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
            <img 
              src="https://navyanetworkblog.wordpress.com/wp-content/uploads/2016/11/shutterstock_262687568.jpg" 
              alt="Healthcare professionals" 
              className="w-4/5 h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
