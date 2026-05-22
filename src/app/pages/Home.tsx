import { motion } from "motion/react";
import { Calendar, MessageCircle, BookOpen, TrendingUp, Shield, Clock, Users } from "lucide-react";
import { Link } from "react-router";
import cavendishLogo from "../../imports/cavendish_logo.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white">
              <img src={cavendishLogo} alt="Cavendish University" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-bold text-gray-900">CUZ Student Wellness</div>
              <div className="text-xs text-gray-600">Mental Health & Counselling</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#resources" className="text-gray-700 hover:text-blue-600 transition-colors">Resources</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <Link to="/support" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Get Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your mental health matters
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Confidential, accessible counselling and performance support for Cavendish University students. Get help anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-medium shadow-lg hover:shadow-xl text-center">
                  Talk to a Counsellor
                </Link>
                <Link to="/resources" className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all text-lg font-medium text-center">
                  Browse Resources
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span>24/7 Access</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop"
                  alt="Student receiving support"
                  className="rounded-2xl w-full h-[400px] object-cover shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-blue-600">1 in 3</div>
                  <div className="text-sm text-gray-600">students need support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How we support you
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Accessible mental health services designed for student life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Appointment Scheduling"
              description="Book counselling sessions at times that work for you. Easy online scheduling with instant confirmation."
              color="blue"
              link="/appointments"
            />
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="Anonymous Chat"
              description="Chat with counsellors anonymously. Get support without stigma in a safe, confidential space."
              color="green"
              link="/chat"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Self-Help Resources"
              description="Access articles, videos, and wellness assessments. Tools to support your mental health journey."
              color="purple"
              link="/resources"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Performance Tracking"
              description="Monitor your academic progress and well-being. Data-driven insights for better outcomes."
              color="orange"
              link="/performance"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-xl text-blue-100">Confidential & Secure</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl text-blue-100">Access to Resources</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Free</div>
              <div className="text-xl text-blue-100">For All CUZ Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Breaking barriers to mental health support
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Traditional counselling services face challenges including limited accessibility, social stigma, and administrative inefficiencies. Our digital platform bridges this gap.
              </p>
              <div className="space-y-4">
                <BenefitItem text="Reduce stigma through anonymous support options" />
                <BenefitItem text="Access help anytime, from anywhere on campus or home" />
                <BenefitItem text="Track your progress and academic performance" />
                <BenefitItem text="Connect with professional counsellors instantly" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Students supporting each other"
                className="rounded-2xl w-full h-[400px] object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section id="resources" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Self-help resources
            </h2>
            <p className="text-xl text-gray-600">
              Explore articles, videos, and tools to support your well-being
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ResourceCard
              title="Managing Exam Stress"
              category="Article"
              image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
            />
            <ResourceCard
              title="Mindfulness Meditation"
              category="Video"
              image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"
            />
            <ResourceCard
              title="Wellness Assessment"
              category="Interactive"
              image="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=300&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            You don't have to face it alone
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Professional support is just a click away. Start your journey to better mental health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/support" className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all text-lg font-medium shadow-lg">
              Request Support Now
            </Link>
            <a href="#about" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all text-lg font-medium">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-white">CUZ Wellness</span>
              </div>
              <p className="text-sm">
                Supporting Cavendish University Zambia students with confidential mental health and performance counselling.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/appointments" className="hover:text-blue-400 transition-colors">Counselling</Link></li>
                <li><Link to="/appointments" className="hover:text-blue-400 transition-colors">Appointments</Link></li>
                <li><Link to="/chat" className="hover:text-blue-400 transition-colors">Anonymous Chat</Link></li>
                <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Articles</Link></li>
                <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Videos</Link></li>
                <li><Link to="/resources" className="hover:text-blue-400 transition-colors">Assessments</Link></li>
                <li><Link to="/chat" className="hover:text-blue-400 transition-colors">Crisis Help</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>Cavendish University Zambia</li>
                <li>Email: wellness@cavendish.ac.zm</li>
                <li>Emergency: 24/7 Support Line</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 Cavendish University Zambia. All rights reserved. Your conversations are confidential and secure.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color, link }: { icon: React.ReactNode; title: string; description: string; color: string; link: string }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 h-full"
      >
        <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </Link>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

function ResourceCard({ title, category, image }: { title: string; category: string; image: string }) {
  return (
    <Link to="/resources">
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            Explore →
          </button>
        </div>
      </motion.div>
    </Link>
  );
}