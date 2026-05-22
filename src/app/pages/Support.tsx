import { motion } from "motion/react";
import { Calendar, MessageCircle, BookOpen, TrendingUp, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router";
import cavendishLogo from "../../imports/cavendish_logo.jpg";

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
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
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors text-sm sm:text-base">
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How can we help you today?
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Choose the support service that best fits your needs. All services are confidential, secure, and available 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options Grid */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Appointment Scheduling */}
            <SupportCard
              icon={<Calendar className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Book an Appointment"
              description="Schedule a one-on-one session with a professional counsellor or specialist at a time that works for you."
              color="blue"
              link="/appointments"
              features={[
                "Choose your preferred counsellor",
                "Select convenient time slots",
                "In-person or virtual sessions",
                "Instant confirmation"
              ]}
            />

            {/* Anonymous Chat */}
            <SupportCard
              icon={<MessageCircle className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Chat with a Specialist"
              description="Connect instantly with counsellors and mental health specialists through our secure, anonymous chat platform."
              color="green"
              link="/chat"
              features={[
                "100% anonymous & confidential",
                "Real-time conversations",
                "Available 24/7",
                "No appointment needed"
              ]}
            />

            {/* Self-Help Resources */}
            <SupportCard
              icon={<BookOpen className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Access Resources"
              description="Explore our library of self-help materials, including articles, videos, assessments, and wellness tools."
              color="purple"
              link="/resources"
              features={[
                "Expert articles & guides",
                "Video tutorials",
                "Interactive assessments",
                "Wellness exercises"
              ]}
            />

            {/* Performance Tracking */}
            <SupportCard
              icon={<TrendingUp className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Track Your Progress"
              description="Monitor your mental health journey and academic performance with personalized insights and analytics."
              color="orange"
              link="/performance"
              features={[
                "Mood & wellness tracking",
                "Academic performance metrics",
                "Progress visualization",
                "Personalized recommendations"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Emergency Support Banner */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 sm:p-8 text-white text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">In Crisis? Get Immediate Help</h3>
            <p className="text-lg mb-6 opacity-90">
              If you're experiencing a mental health emergency, our crisis support team is available 24/7.
            </p>
            <Link
              to="/chat"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-all text-base sm:text-lg font-medium shadow-lg"
            >
              Connect to Crisis Support Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-white">CUZ Wellness</span>
          </div>
          <p className="text-sm">
            © 2026 Cavendish University Zambia. All rights reserved. Your conversations are confidential and secure.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  description,
  color,
  link,
  features
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  link: string;
  features: string[];
}) {
  const colorClasses = {
    blue: {
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
      hover: "hover:border-blue-500"
    },
    green: {
      gradient: "from-green-500 to-green-600",
      bg: "bg-green-50",
      text: "text-green-600",
      hover: "hover:border-green-500"
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      bg: "bg-purple-50",
      text: "text-purple-600",
      hover: "hover:border-purple-500"
    },
    orange: {
      gradient: "from-orange-500 to-orange-600",
      bg: "bg-orange-50",
      text: "text-orange-600",
      hover: "hover:border-orange-500"
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses];

  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 ${colors.hover} h-full flex flex-col`}
      >
        <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${colors.gradient} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
          {icon}
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">{description}</p>
        
        <div className="space-y-3 mb-6 flex-grow">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <svg className={`w-3 h-3 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
            </div>
          ))}
        </div>

        <div className={`flex items-center gap-2 ${colors.text} font-semibold text-base sm:text-lg group-hover:gap-3 transition-all`}>
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </motion.div>
    </Link>
  );
}