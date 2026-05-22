import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, BookOpen, Brain, Target, ChevronRight, ArrowUp, ArrowDown, Activity, Calendar, Award } from "lucide-react";
import { Link } from "react-router";
import { subWeeks, format } from "date-fns";

const generateWeeklyData = () => {
  const weeks = 8;
  const data = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const baseMood = 5 + Math.sin((weeks - i) * 0.5) * 2 + Math.random() * 1.5;
    const baseStudy = 3 + Math.sin((weeks - i) * 0.4) * 1.5 + Math.random() * 2;
    data.push({
      week: format(subWeeks(new Date(), i), "MMM d"),
      mood: Math.round(Math.min(10, Math.max(1, baseMood)) * 10) / 10,
      study: Math.round(Math.min(8, Math.max(0, baseStudy)) * 10) / 10,
      sessions: Math.floor(1 + Math.random() * 3),
      wellbeing: Math.round(Math.min(100, Math.max(30, 50 + (weeks - i) * 4 + Math.random() * 10))),
    });
  }
  return data;
};

const weeklyData = generateWeeklyData();
const current = weeklyData[weeklyData.length - 1];
const previous = weeklyData[weeklyData.length - 2] || current;

const milestones = [
  { label: "Sessions Completed", value: 12, icon: Calendar, color: "blue" },
  { label: "Consecutive Weeks", value: 6, icon: Activity, color: "green" },
  { label: "Well-being Score", value: `${current.wellbeing}%`, icon: Award, color: "purple" },
  { label: "Study Consistency", value: "B+", icon: BookOpen, color: "orange" },
];

export default function PerformanceTracking() {
  const [selectedMetric, setSelectedMetric] = useState<"mood" | "study" | "wellbeing">("mood");

  const changes = [
    { label: "Mood Score", value: current.mood, change: ((current.mood - previous.mood) / previous.mood * 100).toFixed(1) },
    { label: "Study Hours/Week", value: current.study, change: ((current.study - previous.study) / previous.study * 100).toFixed(1) },
    { label: "Well-being", value: `${current.wellbeing}%`, change: ((current.wellbeing - previous.wellbeing) / previous.wellbeing * 100).toFixed(1) },
    { label: "Sessions/Week", value: current.sessions, change: ((current.sessions - previous.sessions) / previous.sessions * 100).toFixed(1) },
  ];

  useEffect(() => {
    localStorage.setItem("cuz_performance", JSON.stringify({ weeklyData, lastUpdated: new Date().toISOString() }));
  }, []);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="text-orange-600 hover:text-orange-700 mb-6 inline-flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Performance Tracking</h1>
              <p className="text-lg text-gray-600">Monitor your academic progress and well-being over time</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-6">Last 8 weeks overview — tracking your mental health journey</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {milestones.map((m, i) => {
            const Icon = m.icon;
            const colorClasses = { blue: "from-blue-500 to-blue-600", green: "from-green-500 to-green-600", purple: "from-purple-500 to-purple-600", orange: "from-orange-500 to-orange-600" };
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[m.color]} rounded-xl flex items-center justify-center text-white mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{m.value}</div>
                <div className="text-sm text-gray-600">{m.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {changes.map((c, i) => {
            const isUp = parseFloat(c.change) >= 0;
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.05 }}
                className="bg-white rounded-xl p-4 shadow border border-gray-100 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-gray-500">{c.label}</div>
                  <div className="text-lg font-bold text-gray-900">{c.value}</div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${isUp ? "text-green-600" : "text-red-500"}`}>
                  {isUp ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(parseFloat(c.change))}%
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Progress Over Time</h2>
              <div className="flex gap-2">
                {(["mood", "study", "wellbeing"] as const).map(m => (
                  <button key={m} onClick={() => setSelectedMetric(m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                      selectedMetric === m ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {m === "mood" ? "Mood" : m === "study" ? "Study" : "Well-being"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="flex items-end gap-2 h-64">
                {weeklyData.map((week, i) => {
                  const value = selectedMetric === "mood" ? week.mood * 10 : selectedMetric === "study" ? week.study * 12 : week.wellbeing;
                  const maxVal = selectedMetric === "wellbeing" ? 100 : 100;
                  const heightPct = Math.max(5, (value / maxVal) * 100);
                  const barColor = selectedMetric === "mood"
                    ? "bg-gradient-to-t from-orange-400 to-orange-300"
                    : selectedMetric === "study"
                    ? "bg-gradient-to-t from-blue-400 to-blue-300"
                    : "bg-gradient-to-t from-green-400 to-green-300";
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="relative w-full flex justify-center">
                        <div
                          className={`w-[85%] rounded-t-lg ${barColor} transition-all duration-500 group-hover:opacity-80 cursor-pointer relative`}
                          style={{ height: `${heightPct}%`, minHeight: "8px" }}
                        >
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                            {selectedMetric === "mood" ? `${week.mood}/10` : selectedMetric === "study" ? `${week.study}h` : `${week.wellbeing}%`}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1">{week.week.split(" ")[0]}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
                <span className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded ${selectedMetric === "mood" ? "bg-orange-400" : selectedMetric === "study" ? "bg-blue-400" : "bg-green-400"}`} />
                  {selectedMetric === "mood" ? "Mood Score (1-10)" : selectedMetric === "study" ? "Study Hours" : "Well-being %"}
                </span>
                <span>Hover bars for exact values</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
            <div className="bg-gradient-to-br from-orange-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
              <Target className="w-10 h-10 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Patient Improvement</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Well-being</span>
                    <span>{current.wellbeing}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div className="bg-white rounded-full h-2.5 transition-all duration-1000" style={{ width: `${current.wellbeing}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mood Stability</span>
                    <span>{(current.mood / 10 * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div className="bg-white rounded-full h-2.5 transition-all duration-1000" style={{ width: `${current.mood / 10 * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Session Adherence</span>
                    <span>{Math.round(current.sessions / 3 * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div className="bg-white rounded-full h-2.5 transition-all duration-1000" style={{ width: `${current.sessions / 3 * 100}%` }} />
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Activity className="w-4 h-4" />
                  <span>8-week trend: <strong className="text-white">Improving</strong></span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">AI Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <Brain className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Mood improving</div>
                    <div className="text-xs text-gray-500">Your mood score increased {changes[0].change}% this period</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Study consistency</div>
                    <div className="text-xs text-gray-500">Your study hours are stabilizing — great habit building!</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                  <Activity className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Session commitment</div>
                    <div className="text-xs text-gray-500">You've attended {current.sessions} session{current.sessions > 1 ? "s" : ""} this week</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
