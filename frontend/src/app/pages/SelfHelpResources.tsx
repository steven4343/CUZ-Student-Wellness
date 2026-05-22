import { motion } from "motion/react";
import { BookOpen, Play, ClipboardList, ArrowRight, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router";

const articles = [
  { title: "Managing Exam Stress", desc: "Practical techniques to stay calm and focused during exams", readTime: "5 min read" },
  { title: "Building Healthy Relationships", desc: "Tips for maintaining supportive connections at university", readTime: "7 min read" },
  { title: "Understanding Anxiety", desc: "Learn to recognize anxiety symptoms and coping strategies", readTime: "6 min read" },
  { title: "Sleep Hygiene for Students", desc: "Improve your sleep quality for better mental health", readTime: "4 min read" },
];

const videos = [
  { title: "Guided Mindfulness Meditation", duration: "15 min" },
  { title: "Breathing Exercises for Calm", duration: "10 min" },
  { title: "Progressive Muscle Relaxation", duration: "12 min" },
];

const assessments = [
  { title: "Wellness Check", desc: "Quick self-assessment of your overall well-being", questions: "10 questions" },
  { title: "Stress Level Test", desc: "Evaluate your current stress levels", questions: "8 questions" },
  { title: "Anxiety Screening", desc: "Self-screening for anxiety symptoms", questions: "7 questions" },
];

export default function SelfHelpResources() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="text-purple-600 hover:text-purple-700 mb-6 inline-flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Self-Help Resources</h1>
              <p className="text-lg text-gray-600">Articles, videos, and tools to support your well-being</p>
            </div>
          </div>
        </motion.div>

        <div className="relative mt-8 mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-lg"
          />
        </div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-7 h-7 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {articles.map((article, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{article.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                  <ArrowRight className="w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-3 mb-8">
            <Play className="w-7 h-7 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Guided Videos</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {videos.map((video, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <span className="text-sm text-purple-200">{video.duration}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-3 mb-8">
            <ClipboardList className="w-7 h-7 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Wellness Assessments</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {assessments.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <ClipboardList className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{item.questions}</span>
                  <span className="text-sm text-purple-600 font-medium group-hover:gap-2 transition-all flex items-center gap-1">
                    Start <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
