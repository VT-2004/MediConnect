
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-8 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">MediConnect</h3>
            <p className="text-sm">
              Connecting patients with healthcare professionals and AI-powered health assistance.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-medical-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-medical-blue transition-colors">Find Doctors</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-medical-blue transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/Register" className="hover:text-medical-blue transition-colors">Register</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: VT@gmail.com</li>
              <li>Phone: +91 9999999999</li>
              <li>Address: Majestic, Bengaluru</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
