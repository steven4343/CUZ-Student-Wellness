import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, TrendingDown, Smile, Frown, Meh, Calendar, Award, Brain, Target } from "lucide-react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import cavendishLogo from "../../imports/cavendish_logo.jpg";

// Mock data for mental health tracking
const moodData = [
  { date: "May 1", mood: 7, stress: 4, sleep: 6, energy: 7 },
  { date: "May 2", mood: 6, stress: 5, sleep: 5, energy: 6 },
  { date: "May 3", mood: 8, stress: 3, sleep: 7, energy: 8 },
  { date: "May 4", mood: 7, stress: 4, sleep: 6, energy: 7 },
  { date: "May 5", mood: 5, stress: 7, sleep: 4, energy: 5 },
  { date: "May 6", mood: 6, stress: 6, sleep: 5, energy: 6 },
  { date: "May 7", mood: 8, stress: 3, sleep: 8, energy: 8 },
  { date: "May 8", mood: 7, stress: 4, sleep: 7, energy: 7 },
  { date: "May 9", mood: 9, stress: 2, sleep: 8, energy: 9 },
  { date: "May 10", mood: 8, stress: 3, sleep: 7, energy: 8 },
  { date: "May 11", mood: 7, stress: 4, sleep: 6, energy: 7 },
  { date: "May 12", mood: 8, stress: 3, sleep: 7, energy: 8 }
];

// Mock data for academic performance
const academicData = [
  { course: "Psychology 101", grade: 85, attendance: 95, assignments: 90 },
  { course: "Sociology 201", grade: 78, attendance: 88, assignments: 82 },
  { course: "Statistics", grade: 92, attendance: 100, assignments: 95 },
  { course: "Research Methods", grade: 88, attendance: 92, assignments: 90 },
  { course: "Social Work", grade: 82, attendance: 85, assignments: 80 }
];

const weeklyProgressData = [
  { week: "Week 1", gpa: 3.2, wellbeing: 70 },
  { week: "Week 2", gpa: 3.4, wellbeing: 75 },
  { week: "Week 3", gpa: 3.3, wellbeing: 68 },
  { week: "Week 4", gpa: 3.6, wellbeing: 80 },
  { week: "Week 5", gpa: 3.7, wellbeing: 82 },
  { week: "Week 6", gpa: 3.8, wellbeing: 85 }
];

export default function PerformanceTracking() {
  const [todayMood, setTodayMood] = useState([7]);
  const [todayStress, setTodayStress] = useState([4]);
  const [todaySleep, setTodaySleep] = useState([7]);
  const [todayEnergy, setTodayEnergy] = useState([7]);

  const handleLogMood = () => {
    toast.success("Daily check-in recorded successfully!");
  };

  const averageMood = (moodData.reduce((acc, curr) => acc + curr.mood, 0) / moodData.length).toFixed(1);
  const averageStress = (moodData.reduce((acc, curr) => acc + curr.stress, 0) / moodData.length).toFixed(1);
  const currentGPA = 3.7;
  const overallWellbeing = 82;

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Performance Tracking
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor your mental health journey and academic progress with personalized insights
            </p>
          </motion.div>

          {/* Overview Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Smile className="w-8 h-8" />}
              title="Average Mood"
              value={averageMood}
              max="10"
              color="green"
              trend="up"
              change="+0.5"
            />
            <StatCard
              icon={<Brain className="w-8 h-8" />}
              title="Stress Level"
              value={averageStress}
              max="10"
              color="orange"
              trend="down"
              change="-1.2"
            />
            <StatCard
              icon={<Award className="w-8 h-8" />}
              title="Current GPA"
              value={currentGPA.toFixed(1)}
              max="4.0"
              color="blue"
              trend="up"
              change="+0.3"
            />
            <StatCard
              icon={<Target className="w-8 h-8" />}
              title="Overall Wellbeing"
              value={`${overallWellbeing}%`}
              max=""
              color="purple"
              trend="up"
              change="+5%"
            />
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="mental-health" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            {/* Mental Health Tab */}
            <TabsContent value="mental-health" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Daily Check-in */}
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Daily Check-in</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>How's your mood today?</Label>
                        <span className="text-2xl">{getMoodEmoji(todayMood[0])}</span>
                      </div>
                      <Slider
                        value={todayMood}
                        onValueChange={setTodayMood}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Poor</span>
                        <span className="font-medium text-blue-600">{todayMood[0]}/10</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Stress level</Label>
                        <span className={`text-sm font-medium ${todayStress[0] > 7 ? 'text-red-600' : todayStress[0] > 4 ? 'text-orange-600' : 'text-green-600'}`}>
                          {todayStress[0] > 7 ? 'High' : todayStress[0] > 4 ? 'Moderate' : 'Low'}
                        </span>
                      </div>
                      <Slider
                        value={todayStress}
                        onValueChange={setTodayStress}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Relaxed</span>
                        <span className="font-medium">{todayStress[0]}/10</span>
                        <span>Very Stressed</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Sleep quality</Label>
                        <span className="text-sm text-gray-600">{todaySleep[0]} hours</span>
                      </div>
                      <Slider
                        value={todaySleep}
                        onValueChange={setTodaySleep}
                        max={12}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Energy level</Label>
                      </div>
                      <Slider
                        value={todayEnergy}
                        onValueChange={setTodayEnergy}
                        max={10}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Exhausted</span>
                        <span className="font-medium">{todayEnergy[0]}/10</span>
                        <span>Energized</span>
                      </div>
                    </div>

                    <Button onClick={handleLogMood} className="w-full">
                      Save Check-in
                    </Button>
                  </div>
                </Card>

                {/* Mood Trends */}
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Mood Trends (Last 12 Days)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="mood" stroke="#3b82f6" fill="#93c5fd" name="Mood" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Detailed Metrics */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="Mood" />
                    <Line type="monotone" dataKey="stress" stroke="#f97316" strokeWidth={2} name="Stress" />
                    <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={2} name="Sleep" />
                    <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            {/* Academic Tab */}
            <TabsContent value="academic" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Course Performance */}
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Performance</h3>
                  <div className="space-y-4">
                    {academicData.map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{course.course}</span>
                          <span className="text-lg font-bold text-blue-600">{course.grade}%</span>
                        </div>
                        <Progress value={course.grade} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Attendance & Assignments */}
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Attendance & Assignments</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={academicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="course" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={100} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="attendance" fill="#10b981" name="Attendance %" />
                      <Bar dataKey="assignments" fill="#3b82f6" name="Assignments %" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* GPA Trend */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">GPA Progression</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" domain={[0, 4]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={3} name="GPA" />
                    <Line yAxisId="right" type="monotone" dataKey="wellbeing" stroke="#10b981" strokeWidth={2} name="Wellbeing Score" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Insights</h3>
                  <div className="space-y-4">
                    <InsightItem
                      type="positive"
                      text="Your mood has improved by 15% over the last week. Great progress!"
                    />
                    <InsightItem
                      type="warning"
                      text="Your stress levels peaked on May 5th. Consider scheduling a counselling session."
                    />
                    <InsightItem
                      type="positive"
                      text="You're maintaining excellent attendance (95% average). Keep it up!"
                    />
                    <InsightItem
                      type="neutral"
                      text="Sleep quality varies. Try maintaining a consistent sleep schedule."
                    />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    <RecommendationItem
                      title="Take a Mindfulness Break"
                      description="Based on your stress levels, try our 10-minute meditation."
                      link="/resources"
                    />
                    <RecommendationItem
                      title="Schedule a Check-in"
                      description="It's been 2 weeks since your last counselling session."
                      link="/appointments"
                    />
                    <RecommendationItem
                      title="Exam Prep Resources"
                      description="Finals are approaching. Check out our study tips."
                      link="/resources"
                    />
                  </div>
                </Card>
              </div>

              {/* Correlation Chart */}
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mental Health vs Academic Performance</h3>
                <p className="text-gray-600 mb-4">
                  This chart shows the correlation between your wellbeing score and academic performance over time.
                </p>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" domain={[0, 4]} label={{ value: 'GPA', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} label={{ value: 'Wellbeing %', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={3} name="GPA" />
                    <Line yAxisId="right" type="monotone" dataKey="wellbeing" stroke="#10b981" strokeWidth={3} name="Wellbeing" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, title, value, max, color, trend, change }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  max: string;
  color: string;
  trend: "up" | "down";
  change: string;
}) {
  const colors = {
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600"
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color as keyof typeof colors]} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {max && <span className="text-gray-500">/ {max}</span>}
      </div>
    </Card>
  );
}

function getMoodEmoji(mood: number) {
  if (mood >= 8) return "😊";
  if (mood >= 6) return "🙂";
  if (mood >= 4) return "😐";
  return "😔";
}

function InsightItem({ type, text }: { type: "positive" | "warning" | "neutral"; text: string }) {
  const styles = {
    positive: { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600", iconBg: "bg-green-100" },
    warning: { bg: "bg-orange-50", border: "border-orange-200", icon: "text-orange-600", iconBg: "bg-orange-100" },
    neutral: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", iconBg: "bg-blue-100" }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 flex gap-3`}>
      <div className={`${style.iconBg} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
        {type === "positive" && <TrendingUp className={`w-5 h-5 ${style.icon}`} />}
        {type === "warning" && <Brain className={`w-5 h-5 ${style.icon}`} />}
        {type === "neutral" && <Target className={`w-5 h-5 ${style.icon}`} />}
      </div>
      <p className="text-gray-800 text-sm">{text}</p>
    </div>
  );
}

function RecommendationItem({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <Link to={link}>
      <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
        <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}