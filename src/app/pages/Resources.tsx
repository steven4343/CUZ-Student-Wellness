import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, BookOpen, Video, FileText, Brain, Search, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import cavendishLogo from "../../imports/cavendish_logo.jpg";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "article" | "video" | "assessment" | "exercise";
  duration: string;
  image: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Managing Exam Stress and Anxiety",
    description: "Learn practical techniques to handle academic pressure and perform better during exams.",
    category: "Academic",
    type: "article",
    duration: "8 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    tags: ["stress", "anxiety", "exams"]
  },
  {
    id: "2",
    title: "Mindfulness Meditation for Students",
    description: "A guided meditation session designed to help you relax and focus on the present moment.",
    category: "Wellness",
    type: "video",
    duration: "15 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    tags: ["meditation", "mindfulness", "relaxation"]
  },
  {
    id: "3",
    title: "Mental Health Wellness Assessment",
    description: "Take this quick assessment to understand your current mental health status and get personalized recommendations.",
    category: "Assessment",
    type: "assessment",
    duration: "10 min",
    image: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400&h=300&fit=crop",
    tags: ["assessment", "wellness", "self-help"]
  },
  {
    id: "4",
    title: "Dealing with Depression",
    description: "Understanding depression symptoms and effective coping strategies for students.",
    category: "Mental Health",
    type: "article",
    duration: "12 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop",
    tags: ["depression", "mood", "coping"]
  },
  {
    id: "5",
    title: "Breathing Exercises for Anxiety",
    description: "Simple breathing techniques you can use anywhere to calm anxiety and reduce stress.",
    category: "Wellness",
    type: "exercise",
    duration: "5 min",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
    tags: ["anxiety", "breathing", "exercises"]
  },
  {
    id: "6",
    title: "Building Healthy Relationships",
    description: "Learn how to develop and maintain healthy friendships and romantic relationships in university.",
    category: "Relationships",
    type: "video",
    duration: "20 min",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
    tags: ["relationships", "social", "communication"]
  },
  {
    id: "7",
    title: "Sleep Hygiene for Better Rest",
    description: "Improve your sleep quality with evidence-based techniques for better academic performance.",
    category: "Wellness",
    type: "article",
    duration: "7 min read",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop",
    tags: ["sleep", "wellness", "health"]
  },
  {
    id: "8",
    title: "Time Management Strategies",
    description: "Master your schedule and reduce stress with effective time management techniques.",
    category: "Academic",
    type: "article",
    duration: "10 min read",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
    tags: ["productivity", "time management", "stress"]
  },
  {
    id: "9",
    title: "Understanding and Managing Anger",
    description: "Learn to recognize anger triggers and develop healthy ways to express and manage emotions.",
    category: "Mental Health",
    type: "video",
    duration: "18 min",
    image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=400&h=300&fit=crop",
    tags: ["anger", "emotions", "coping"]
  }
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(resources.map(r => r.category)))];

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
              Self-Help Resources
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our library of articles, videos, assessments, and wellness tools to support your mental health journey
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources by title, topic, or tag..."
                className="pl-10 h-12 text-base"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Resources Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="article">
                <FileText className="w-4 h-4 mr-2 hidden sm:inline" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="video">
                <Video className="w-4 h-4 mr-2 hidden sm:inline" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="assessment">
                <Brain className="w-4 h-4 mr-2 hidden sm:inline" />
                Tests
              </TabsTrigger>
              <TabsTrigger value="exercise">
                <BookOpen className="w-4 h-4 mr-2 hidden sm:inline" />
                Exercises
              </TabsTrigger>
            </TabsList>

            {["all", "article", "video", "assessment", "exercise"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources
                    .filter((r) => tab === "all" || r.type === tab)
                    .map((resource, index) => (
                      <ResourceCard key={resource.id} resource={resource} index={index} />
                    ))}
                </div>

                {filteredResources.filter((r) => tab === "all" || r.type === tab).length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No resources found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const typeIcons = {
    article: <FileText className="w-4 h-4" />,
    video: <Video className="w-4 h-4" />,
    assessment: <Brain className="w-4 h-4" />,
    exercise: <BookOpen className="w-4 h-4" />
  };

  const typeColors = {
    article: "bg-blue-100 text-blue-700",
    video: "bg-purple-100 text-purple-700",
    assessment: "bg-green-100 text-green-700",
    exercise: "bg-orange-100 text-orange-700"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge className={typeColors[resource.type]}>
              <span className="flex items-center gap-1">
                {typeIcons[resource.type]}
                <span className="capitalize">{resource.type}</span>
              </span>
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {resource.duration}
            </Badge>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <Badge variant="outline" className="w-fit mb-3 text-xs">
            {resource.category}
          </Badge>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {resource.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 flex-1">
            {resource.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
            View Resource
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}