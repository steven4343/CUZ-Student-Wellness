import { Link, Outlet, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import cavendishLogo from "@/assets/cavendish-logo.jpg";

export default function Layout() {
  const { user, isGuest, logout } = useAuth();
  const navigate = useNavigate();

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("features");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 flex flex-col">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={cavendishLogo} alt="Cavendish University" className="w-10 h-10 rounded-lg object-contain" />
            <div>
              <div className="font-bold text-gray-900">CUZ Student Wellness</div>
              <div className="text-xs text-gray-600">Mental Health & Counselling</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="" onClick={scrollToFeatures} className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="" onClick={(e) => { e.preventDefault(); const el = document.getElementById("resources"); if (el) el.scrollIntoView({ behavior: "smooth" }); else { navigate("/"); setTimeout(() => document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" }), 100); }}} className="text-gray-700 hover:text-blue-600 transition-colors">Resources</a>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {isGuest ? "Guest" : `Hi, ${user.full_name}`}
                </span>
                <button onClick={logout} className="text-gray-700 hover:text-red-600 transition-colors text-sm">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Sign In</Link>
                <Link to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={cavendishLogo} alt="Cavendish University" className="w-8 h-8 rounded object-contain" />
                <span className="font-bold text-white">CUZ Wellness</span>
              </div>
              <p className="text-sm">
                Supporting Cavendish University Zambia students with confidential mental health and performance counselling.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services/appointments" className="hover:text-blue-400 transition-colors">Counselling</Link></li>
                <li><Link to="/services/appointments" className="hover:text-blue-400 transition-colors">Appointments</Link></li>
                <li><Link to="/services/chat" className="hover:text-blue-400 transition-colors">Anonymous Chat</Link></li>
                <li><Link to="/services/resources" className="hover:text-blue-400 transition-colors">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/services/resources" className="hover:text-blue-400 transition-colors">Articles</Link></li>
                <li><Link to="/services/resources" className="hover:text-blue-400 transition-colors">Videos</Link></li>
                <li><Link to="/services/resources" className="hover:text-blue-400 transition-colors">Assessments</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Crisis Help</a></li>
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
