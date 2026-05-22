import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar as CalendarIcon, Clock, CheckCircle, ChevronRight, Video, Phone, Building, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, addMonths, subMonths } from "date-fns";

const doctors = [
  { id: 1, name: "Dr. Mary Banda", specialty: "Clinical Psychologist", available: true },
  { id: 2, name: "Mr. John Phiri", specialty: "Counselling Psychologist", available: true },
  { id: 3, name: "Ms. Sarah Tembo", specialty: "Mental Health Nurse", available: true },
  { id: 4, name: "Dr. Peter Zulu", specialty: "Psychiatrist", available: false },
  { id: 5, name: "Dr. Grace Mwale", specialty: "Educational Psychologist", available: true },
  { id: 6, name: "Mr. Brian Banda", specialty: "Guidance Counsellor", available: true },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AppointmentScheduling() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0].id);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
  const [appointmentType, setAppointmentType] = useState<"online" | "physical" | "call">("online");
  const [step, setStep] = useState(1);
  const [booked, setBooked] = useState(false);
  const [appointments, setAppointments] = useState<Array<{
    doctor: string; date: string; time: string; type: string; id: number
  }>>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cuz_appointments");
    if (saved) setAppointments(JSON.parse(saved));
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const handleBook = () => {
    if (!selectedDate) return;
    const doctor = doctors.find(d => d.id === selectedDoctor);
    const newAppt = {
      id: Date.now(),
      doctor: doctor?.name || "",
      date: format(selectedDate, "PPP"),
      time: selectedTime,
      type: appointmentType,
    };
    const updated = [...appointments, newAppt];
    setAppointments(updated);
    localStorage.setItem("cuz_appointments", JSON.stringify(updated));
    setBooked(true);
    setTimeout(() => { setBooked(false); setStep(1); setSelectedDate(null); }, 3000);
  };

  const doctor = doctors.find(d => d.id === selectedDoctor);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Appointment Scheduling</h1>
              <p className="text-lg text-gray-600">Book counselling sessions at times that work for you</p>
            </div>
          </div>
        </motion.div>

        {booked ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
            <p className="text-lg text-gray-600">
              {doctor?.name} — {format(selectedDate || today, "PPP")} at {selectedTime}
            </p>
            <p className="text-sm text-gray-500 mt-2">Confirmation sent to your student email</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-4 mb-6">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => setStep(s)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      step === s ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      step === s ? "bg-white/20" : "bg-gray-300 text-white"
                    }`}>{s}</span>
                    {s === 1 ? "Date & Time" : s === 2 ? "Doctor & Type" : "Confirm"}
                  </button>
                ))}
              </div>

              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>

                  <div className="flex items-center justify-between mb-6">
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h3>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {weekdays.map(d => (
                      <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
                    ))}
                    {Array.from({ length: startDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {days.map((day, i) => {
                      const isPast = day < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      return (
                        <button key={i} onClick={() => !isPast && setSelectedDate(day)}
                          disabled={isPast}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            selectedDate && isSameDay(day, selectedDate)
                              ? "bg-blue-600 text-white shadow-lg"
                              : isToday(day)
                              ? "bg-blue-50 text-blue-600 border border-blue-200"
                              : isPast
                              ? "text-gray-300 cursor-not-allowed"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          {format(day, "d")}
                        </button>
                      );
                    })}
                  </div>

                  {selectedDate && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
                        Available Times for {format(selectedDate, "EEEE, MMM d")}
                      </h3>
                      <div className="grid grid-cols-4 gap-3">
                        {timeSlots.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                              selectedTime === t
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <button onClick={() => selectedDate && setStep(2)}
                    disabled={!selectedDate}
                    className="mt-8 w-full px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-lg font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Doctor & Appointment Type</h2>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Counsellor</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {doctors.map(d => (
                      <button key={d.id} onClick={() => d.available && setSelectedDoctor(d.id)}
                        disabled={!d.available}
                        className={`p-4 rounded-xl text-left transition-all border ${
                          selectedDoctor === d.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : d.available
                            ? "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                            : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{d.name}</div>
                        <div className="text-sm text-gray-600">{d.specialty}</div>
                        <div className={`text-xs mt-1 ${d.available ? "text-green-600" : "text-red-500"}`}>
                          {d.available ? "Available" : "Fully Booked"}
                        </div>
                      </button>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Type</h3>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { id: "online" as const, icon: Video, label: "Online Video", desc: "Zoom/Teams call" },
                      { id: "physical" as const, icon: Building, label: "Physical", desc: "On-campus session" },
                      { id: "call" as const, icon: Phone, label: "Direct Call", desc: "Phone consultation" },
                    ].map(t => {
                      const Icon = t.icon;
                      return (
                        <button key={t.id} onClick={() => setAppointmentType(t.id)}
                          className={`p-6 rounded-xl text-center transition-all border ${
                            appointmentType === t.id
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                            appointmentType === t.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="font-semibold text-gray-900">{t.label}</div>
                          <div className="text-xs text-gray-500">{t.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium">
                      ← Back
                    </button>
                    <button onClick={() => setStep(3)} className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-lg font-medium shadow-lg">
                      Review & Confirm →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Appointment</h2>

                  <div className="space-y-4 mb-8">
                    {[
                      { label: "Date", value: selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "" },
                      { label: "Time", value: selectedTime },
                      { label: "Counsellor", value: doctor?.name || "" },
                      { label: "Specialty", value: doctor?.specialty || "" },
                      { label: "Type", value: appointmentType === "online" ? "Online Video Call" : appointmentType === "physical" ? "On-Campus Session" : "Phone Call" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-semibold text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800 mb-8">
                    <strong>Note:</strong> You'll receive a confirmation email at your student address. Appointments can be cancelled up to 2 hours before the scheduled time.
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium">
                      ← Edit
                    </button>
                    <button onClick={handleBook} className="flex-1 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-lg font-medium shadow-lg">
                      Confirm Booking
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-lg">
                <Clock className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="text-xl font-bold mb-2">Session Details</h3>
                <ul className="space-y-3 text-sm text-blue-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>50-minute session with licensed counsellors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Available Monday to Friday, 8 AM - 6 PM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Free for all CUZ students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>Instant confirmation via email</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">My Appointments</h3>
                {appointments.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No upcoming appointments</p>
                    <p className="text-xs text-gray-400">Book your first session above</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {appointments.map(a => (
                      <div key={a.id} className="p-3 bg-blue-50 rounded-xl">
                        <div className="font-medium text-sm text-gray-900">{a.doctor}</div>
                        <div className="text-xs text-gray-600">{a.date} at {a.time}</div>
                        <div className="text-xs text-blue-600 capitalize">{a.type}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
