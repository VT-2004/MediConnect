
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPassword, setPatientPassword] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: patientEmail,
        password: patientPassword,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: doctorEmail,
        password: doctorPassword,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Login successful",
        description: "Welcome back, Doctor!",
      });
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
          
          <Tabs defaultValue="patient">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your patient account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePatientLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <Input
                        id="patient-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="patient-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-medical-blue hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="patient-password"
                        type="password"
                        value={patientPassword}
                        onChange={(e) => setPatientPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-blue hover:bg-medical-blue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                  <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-medical-blue hover:underline">
                      Register here
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctor">
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your doctor account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDoctorLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email">Email</Label>
                      <Input
                        id="doctor-email"
                        type="email"
                        placeholder="doctor.name@example.com"
                        value={doctorEmail}
                        onChange={(e) => setDoctorEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="doctor-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-medical-blue hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="doctor-password"
                        type="password"
                        value={doctorPassword}
                        onChange={(e) => setDoctorPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-blue hover:bg-medical-blue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                  <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-medical-blue hover:underline">
                      Register as a doctor
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
