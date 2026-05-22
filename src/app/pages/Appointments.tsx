import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, User, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Calendar as CalendarComponent } from "../components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import cavendishLogo from "../../imports/cavendish_logo.jpg";

const counsellors = [
  {
    id: "1",
    name: "Dr. Sarah Mwansa",
    specialization: "Anxiety & Stress Management",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop"
  },
  {
    id: "2",
    name: "Dr. James Phiri",
    specialization: "Depression & Mood Disorders",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop"
  },
  {
    id: "3",
    name: "Dr. Grace Banda",
    specialization: "Academic Performance & Career",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
  },
  {
    id: "4",
    name: "Dr. Michael Chanda",
    specialization: "Relationships & Social Issues",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop"
  }
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM"
];

export default function Appointments() {
  const [selectedCounsellor, setSelectedCounsellor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [reason, setReason] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const handleBookAppointment = () => {
    if (!selectedCounsellor || !selectedDate || !selectedTime || !sessionType || !studentName || !studentEmail || !studentId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsBooked(true);
    toast.success("Appointment booked successfully!");

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsBooked(false);
      setSelectedCounsellor("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setSessionType("");
      setStudentName("");
      setStudentEmail("");
      setStudentId("");
      setReason("");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      <Toaster />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white">
              <img src={cavendishLogo} alt="Cavendish University" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-bold text-gray-900">CUZ Student Wellness</div>
              <div className="text-xs text-gray-600">Mental Health & Counselling</div>
            </div>
          </Link>
          <Link to="/support" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Support</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule a confidential session with one of our professional counsellors
            </p>
          </motion.div>

          {isBooked ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 sm:p-12 text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Your appointment has been successfully booked. You'll receive a confirmation email shortly.
                </p>
                <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-bold text-gray-900 mb-4">Appointment Details:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Counsellor:</strong> {counsellors.find(c => c.id === selectedCounsellor)?.name}</p>
                    <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Type:</strong> {sessionType}</p>
                  </div>
                </div>
                <Link to="/support">
                  <Button className="w-full sm:w-auto">Return to Support</Button>
                </Link>
              </Card>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Counsellor Selection */}
              <div className="lg:col-span-3">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Choose Your Counsellor</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {counsellors.map((counsellor) => (
                      <motion.div
                        key={counsellor.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedCounsellor === counsellor.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedCounsellor(counsellor.id)}
                      >
                        <img
                          src={counsellor.image}
                          alt={counsellor.name}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                        />
                        <h3 className="font-bold text-gray-900 text-center text-sm mb-1">{counsellor.name}</h3>
                        <p className="text-xs text-gray-600 text-center">{counsellor.specialization}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Date and Time Selection */}
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Select Date & Time</h2>
                  
                  <div className="mb-6">
                    <Label className="mb-3 block">Choose a Date</Label>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border mx-auto"
                    />
                  </div>

                  <div>
                    <Label className="mb-3 block">Available Time Slots</Label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="text-xs sm:text-sm"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Session Details */}
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Session Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Session Type *</Label>
                      <Select value={sessionType} onValueChange={setSessionType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="virtual">Virtual (Zoom)</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Your Name *</Label>
                      <Input
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label>Student ID *</Label>
                      <Input
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g., CUZ2024001"
                      />
                    </div>

                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="your.email@cavendish.ac.zm"
                      />
                    </div>

                    <div>
                      <Label>Reason for Visit (Optional)</Label>
                      <Textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Brief description of what you'd like to discuss..."
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-3">
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Book?</h3>
                      <p className="text-gray-600">Review your selections and confirm your appointment</p>
                    </div>
                    <Button
                      size="lg"
                      onClick={handleBookAppointment}
                      className="w-full sm:w-auto px-8"
                    >
                      Confirm Appointment
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}