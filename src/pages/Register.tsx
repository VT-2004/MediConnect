
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [doctorData, setDoctorData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialty: "",
    licenseId: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPatientData({
      ...patientData,
      [id.replace("patient-", "")]: value,
    });
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDoctorData({
      ...doctorData,
      [id.replace("doctor-", "")]: value,
    });
  };

  const handleDoctorSelectChange = (value: string) => {
    setDoctorData({
      ...doctorData,
      specialty: value,
    });
  };

  const handlePatientRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (patientData.password !== patientData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: patientData.email,
        password: patientData.password,
        options: {
          data: {
            first_name: patientData.firstName,
            last_name: patientData.lastName,
            role: 'patient'
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Registration successful!",
        description: "Your account has been created. You may now log in.",
      });
      
      // Navigate to login page
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was an error during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (doctorData.password !== doctorData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: doctorData.email,
        password: doctorData.password,
        options: {
          data: {
            first_name: doctorData.firstName,
            last_name: doctorData.lastName,
            role: 'doctor',
            specialty: doctorData.specialty,
            license_id: doctorData.licenseId
          }
        }
      });

      if (error) {
        throw error;
      }

      // After successful authentication, add a new doctor to the doctors table
      const { error: doctorError } = await supabase
        .from('doctors')
        .insert([
          { 
            name: `Dr. ${doctorData.firstName} ${doctorData.lastName}`,
            specialty: doctorData.specialty,
            rating: 4.0, // Default rating for new doctors
            experience: 0, // Default experience for new doctors
            image_url: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`, // Random image
            available: true
          }
        ]);
      
      if (doctorError) {
        console.error("Error adding doctor to database:", doctorError);
        // Continue with successful registration even if doctor table insert fails
      }

      toast({
        title: "Registration successful!",
        description: "Your doctor account has been created. You may now log in.",
      });
      
      // Navigate to login page
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was an error during registration. Please try again.",
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
          <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
          
          <Tabs defaultValue="patient">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Registration</CardTitle>
                  <CardDescription>
                    Create an account to book appointments and use our health assistant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePatientRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-firstName">First Name</Label>
                        <Input
                          id="patient-firstName"
                          value={patientData.firstName}
                          onChange={handlePatientChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-lastName">Last Name</Label>
                        <Input
                          id="patient-lastName"
                          value={patientData.lastName}
                          onChange={handlePatientChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <Input
                        id="patient-email"
                        type="email"
                        value={patientData.email}
                        onChange={handlePatientChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-password">Password</Label>
                      <Input
                        id="patient-password"
                        type="password"
                        value={patientData.password}
                        onChange={handlePatientChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-confirmPassword">Confirm Password</Label>
                      <Input
                        id="patient-confirmPassword"
                        type="password"
                        value={patientData.confirmPassword}
                        onChange={handlePatientChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-blue hover:bg-medical-blue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                  </form>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-medical-blue hover:underline">
                      Sign in here
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctor">
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Registration</CardTitle>
                  <CardDescription>
                    Join our network of healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDoctorRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-firstName">First Name</Label>
                        <Input
                          id="doctor-firstName"
                          value={doctorData.firstName}
                          onChange={handleDoctorChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doctor-lastName">Last Name</Label>
                        <Input
                          id="doctor-lastName"
                          value={doctorData.lastName}
                          onChange={handleDoctorChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-email">Email</Label>
                      <Input
                        id="doctor-email"
                        type="email"
                        value={doctorData.email}
                        onChange={handleDoctorChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-specialty">Specialty</Label>
                      <Select
                        value={doctorData.specialty}
                        onValueChange={handleDoctorSelectChange}
                      >
                        <SelectTrigger id="doctor-specialty">
                          <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                          <SelectItem value="gynecology">Gynecology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-licenseId">Medical License ID</Label>
                      <Input
                        id="doctor-licenseId"
                        value={doctorData.licenseId}
                        onChange={handleDoctorChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-password">Password</Label>
                      <Input
                        id="doctor-password"
                        type="password"
                        value={doctorData.password}
                        onChange={handleDoctorChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor-confirmPassword">Confirm Password</Label>
                      <Input
                        id="doctor-confirmPassword"
                        type="password"
                        value={doctorData.confirmPassword}
                        onChange={handleDoctorChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-medical-blue hover:bg-medical-blue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                  </form>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-medical-blue hover:underline">
                      Sign in here
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

export default Register;
