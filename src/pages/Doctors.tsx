import { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Initial mockup data to use as fallback
const initialDoctorsData = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.8,
    experience: 12,
    image_url: "https://randomuser.me/api/portraits/women/44.jpg",
    available: true
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    rating: 4.9,
    experience: 15,
    image_url: "https://randomuser.me/api/portraits/men/46.jpg",
    available: true
  },
  {
    id: "3",
    name: "Dr. Emily Wilson",
    specialty: "Pediatrics",
    rating: 4.7,
    experience: 8,
    image_url: "https://randomuser.me/api/portraits/women/68.jpg",
    available: false
  },
  {
    id: "4",
    name: "Dr. James Rodriguez",
    specialty: "Orthopedics",
    rating: 4.5,
    experience: 10,
    image_url: "https://randomuser.me/api/portraits/men/62.jpg",
    available: true
  },
  {
    id: "5",
    name: "Dr. Alicia Murphy",
    specialty: "Neurology",
    rating: 4.6,
    experience: 14,
    image_url: "https://randomuser.me/api/portraits/women/90.jpg",
    available: true
  },
  {
    id: "6",
    name: "Dr. Robert Patel",
    specialty: "Psychiatry",
    rating: 4.8,
    experience: 11,
    image_url: "https://randomuser.me/api/portraits/men/32.jpg",
    available: false
  }
];

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  image_url?: string;
  available: boolean;
}

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("all");
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctorsData);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [bookingTime, setBookingTime] = useState<string>("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  // Fetch doctors from Supabase
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      // If we have data from Supabase, use it
      if (data && data.length > 0) {
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast({
        title: "Failed to fetch doctors",
        description: "Using local data instead.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch all doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filter doctors based on search criteria
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialty === "" || doctor.specialty.toLowerCase() === specialty.toLowerCase();
    const matchesAvailability = availability === "all" || 
      (availability === "available" && doctor.available) ||
      (availability === "unavailable" && !doctor.available);
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  // Handle showing all doctors
  const handleShowAllDoctors = () => {
    setSearchTerm("");
    setSpecialty("");
    setAvailability("all");
    fetchDoctors(); // Refresh the list from the database
  };

  // Handle booking appointment
  const handleBookAppointment = (doctor: Doctor) => {
    setBookingDoctor(doctor);
    setIsBookingDialogOpen(true);
  };

  // Handle submit booking
  const handleSubmitBooking = () => {
    if (!bookingDate || !bookingTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to database
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${bookingDoctor?.name} on ${format(bookingDate, "MMMM dd, yyyy")} at ${bookingTime} has been confirmed.`,
      variant: "default"
    });

    // Reset booking state
    setBookingDoctor(null);
    setBookingDate(undefined);
    setBookingTime("");
    setIsBookingDialogOpen(false);
  };

  // Available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Find Doctors</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search by Name
              </label>
              <Input
                id="search"
                placeholder="Enter doctor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger id="availability">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="unavailable">Currently Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* All Doctors Button */}
          <div className="flex justify-center mt-4">
            <Button 
              onClick={handleShowAllDoctors} 
              className="bg-medical-blue hover:bg-medical-blue/90"
            >
              Show All Doctors
            </Button>
          </div>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex p-4">
                  <img
                    src={doctor.image_url || "https://randomuser.me/api/portraits/lego/0.jpg"}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="flex items-center mb-3">
                    <span className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-medical-green' : 'bg-gray-400'} mr-2`}></span>
                    <span className="text-sm">{doctor.available ? 'Available for Appointments' : 'Currently Unavailable'}</span>
                  </div>
                  
                  <Button 
                    className={`w-full ${doctor.available ? 'bg-medical-blue hover:bg-medical-blue/90' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!doctor.available}
                    onClick={() => doctor.available && handleBookAppointment(doctor)}
                  >
                    {doctor.available ? 'Book Appointment' : 'Not Available'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Dialog */}
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Book Appointment with {bookingDoctor?.name}</DialogTitle>
              <DialogDescription>
                Choose your preferred date and time for your appointment with {bookingDoctor?.specialty} specialist.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Select Date</h3>
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={setBookingDate}
                  className="rounded-md border"
                  disabled={(date) => 
                    date < new Date(new Date().setHours(0,0,0,0)) || // Disable past dates
                    date.getDay() === 0 || // Sunday
                    date.getDay() === 6    // Saturday
                  }
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button 
                      key={time}
                      type="button" 
                      variant={bookingTime === time ? "default" : "outline"}
                      onClick={() => setBookingTime(time)}
                      className="text-sm"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsBookingDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitBooking}
                disabled={!bookingDate || !bookingTime}
                className="bg-medical-blue hover:bg-medical-blue/90"
              >
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Doctors;
