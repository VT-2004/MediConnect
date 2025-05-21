
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up authentication listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-medical-blue text-2xl font-bold">Medi<span className="text-medical-green">Connect</span></span>
        </Link>

        <div className="flex space-x-4 items-center">
          <Link to="/doctors">
            <Button variant="ghost">Find Doctors</Button>
          </Link>
          
          {loading ? (
            // Show a loading state when checking authentication
            <span className="text-sm text-gray-500">Loading...</span>
          ) : user ? (
            // Show user info and logout when authenticated
            <>
              <span className="text-sm text-gray-700 mr-2">
                Welcome, {user.user_metadata.first_name || user.email}
              </span>
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </>
          ) : (
            // Show login/register when not authenticated
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-medical-blue hover:bg-medical-blue/90">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
